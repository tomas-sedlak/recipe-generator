import jsPDF from 'jspdf';
import { snakeCase } from 'lodash';
import RecipeData from '../types/RecipeTypes';

const convertFractions = (text: string): string => {
    return text
        .replace(/½/g, '1/2')
        .replace(/⅓/g, '1/3')
        .replace(/⅔/g, '2/3')
        .replace(/¼/g, '1/4')
        .replace(/¾/g, '3/4')
        .replace(/⅕/g, '1/5')
        .replace(/⅖/g, '2/5')
        .replace(/⅗/g, '3/5')
        .replace(/⅘/g, '4/5')
        .replace(/⅙/g, '1/6')
        .replace(/⅚/g, '5/6')
        .replace(/⅛/g, '1/8')
        .replace(/⅜/g, '3/8')
        .replace(/⅝/g, '5/8')
        .replace(/⅞/g, '7/8');
};

const loadImage = async (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
};

const addStackedImages = async (doc: jsPDF, folder: string, items: string[], x: number, y: number, size: number) => {
    for (const item of items) {
        const imagePath = `/images/${folder}/${snakeCase(item)}_stack.png`;
        try {
            const img = await loadImage(imagePath);
            doc.addImage(img, 'PNG', x, y, size, size);
        } catch (error) {
            console.error(`Failed to load image: ${imagePath}`, error);
        }
    }
};

export const generateRecipePDF = async (recipe: RecipeData) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const lineHeight = 10;
    const imageSize = 60; // Size in mm
    let yPosition = margin;

    const addNewPageIfNeeded = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
            return true;
        }
        return false;
    };

    // Add title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(recipe.title, contentWidth - imageSize);
    doc.text(titleLines, margin, yPosition);
    yPosition += (titleLines.length * lineHeight) + lineHeight;

    // Add cooking info
    doc.setFontSize(12);

    const cookingInfo = [
        { label: 'Prep Time:', value: recipe.prepTime },
        { label: 'Cook Time:', value: recipe.cookTime },
        { label: 'Yield:', value: recipe.recipeYield }
    ];

    cookingInfo.forEach((info) => {
        doc.setFont('helvetica', 'bold');
        const labelWidth = doc.getTextWidth(info.label);
        doc.text(info.label, margin, yPosition);

        doc.setFont('helvetica', 'normal');
        doc.text(info.value, margin + labelWidth + 2, yPosition);
        yPosition += lineHeight;
    });

    yPosition += lineHeight;

    // Add cookie preview image
    const imageX = pageWidth - margin - imageSize;
    const imageY = margin;

    try {
        await addStackedImages(doc, recipe.previewFolder, recipe.previewItems, imageX, imageY, imageSize);
        yPosition = Math.max(yPosition, imageY + imageSize + lineHeight);
    } catch (error) {
        console.error('Failed to add cookie preview:', error);
    }

    // Add Ingredients section
    addNewPageIfNeeded(lineHeight * 2);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Ingredients:', margin, yPosition);
    yPosition += lineHeight;

    // Add ingredients list
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    recipe.ingredients.forEach(ingredient => {
        const bulletedText = `• ${convertFractions(ingredient)}`;
        const lines = doc.splitTextToSize(bulletedText, contentWidth - 5);

        addNewPageIfNeeded(lines.length * lineHeight);
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * lineHeight;
    });
    yPosition += lineHeight;

    // Add Instructions section
    addNewPageIfNeeded(lineHeight * 2);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Instructions:', margin, yPosition);
    yPosition += lineHeight;

    // Add instructions list
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    recipe.instructions.forEach((instruction, index) => {
        const numberedText = `${index + 1}. ${convertFractions(instruction)}`;
        const lines = doc.splitTextToSize(numberedText, contentWidth - 5);

        addNewPageIfNeeded(lines.length * lineHeight);
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * lineHeight;
    });
    yPosition += lineHeight;

    // Add Nutrition Facts section
    addNewPageIfNeeded(lineHeight * 2);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Nutrition Facts (per 100g):', margin, yPosition);
    yPosition += lineHeight;

    // Table settings
    const colWidth = [2 * contentWidth / 3, contentWidth / 3];
    const cellPadding = 4;
    const rowHeight = 8;

    // Table data
    const nutritionItems = [
        ['Calories', `${recipe.nutritionData.calories} kcal`],
        ['Total Fat', `${recipe.nutritionData.fat}g`],
        ['Saturated Fat', `${recipe.nutritionData.saturatedFat}g`],
        ['Cholesterol', `${recipe.nutritionData.cholesterol}mg`],
        ['Sodium', `${recipe.nutritionData.sodium}mg`],
        ['Total Carbohydrates', `${recipe.nutritionData.carbohydrates}g`],
        ['Dietary Fiber', `${recipe.nutritionData.fiber}g`],
        ['Sugars', `${recipe.nutritionData.sugar}g`],
        ['Protein', `${recipe.nutritionData.protein}g`],
    ];

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    nutritionItems.forEach((row, index) => {
        // Alternate row background
        if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(margin, yPosition, colWidth[0] + colWidth[1], rowHeight, 'F');
        }

        // Draw cell borders
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, margin + colWidth[0] + colWidth[1], yPosition);

        // Add text
        doc.text(row[0], margin + cellPadding, yPosition + 6);
        doc.text(row[1], margin + colWidth[0] + cellPadding, yPosition + 6);
        yPosition += rowHeight;
    });

    // Draw final border line
    doc.line(margin, yPosition, margin + colWidth[0] + colWidth[1], yPosition);

    // Draw vertical lines
    doc.line(margin, yPosition - (rowHeight * nutritionItems.length), margin, yPosition);
    doc.line(margin + colWidth[0], yPosition - (rowHeight * nutritionItems.length), margin + colWidth[0], yPosition);
    doc.line(margin + colWidth[0] + colWidth[1], yPosition - (rowHeight * nutritionItems.length), margin + colWidth[0] + colWidth[1], yPosition);

    yPosition += lineHeight;

    // Add nutrition disclaimer
    addNewPageIfNeeded(lineHeight * 2);
    const disclaimer = "Nutrition information is automatically calculated, so should only be used as an approximation.";
    const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(disclaimerLines, margin, yPosition);

    // Before returning the doc, add footer to all pages
    const pageCount = doc.internal.pages.length;
    const footerText = 'Generated by mixyourtreat.com';
    const footerLogoSize = 10; // Size in mm for the small logo
    const footerTextX = margin + footerLogoSize + 2; // Add some spacing after the logo

    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.setFont('helvetica', 'normal');

        // Add logo
        try {
            const logoImg = await loadImage('/images/logo.png');
            doc.addImage(
                logoImg,
                'PNG',
                margin,
                pageHeight - (margin / 2) - 7, // Center vertically with text
                footerLogoSize,
                footerLogoSize
            );
        } catch (error) {
            console.error('Failed to load footer logo:', error);
        }

        // Add text next to logo
        doc.text(footerText, footerTextX, pageHeight - margin / 2);
    }

    return doc;
}; 