from PIL import Image
import os

def scale_images():
    # Get the directory where this script is located
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Loop through all files in the directory
    for filename in os.listdir(current_dir):
        # Check if the file is an image (common image extensions)
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            try:
                # Open the image
                image_path = os.path.join(current_dir, filename)
                img = Image.open(image_path)
                
                # Scale the image to 400x400 while maintaining aspect ratio
                img.thumbnail((400, 400), Image.Resampling.LANCZOS)
                
                # Create a new 400x400 white background
                new_img = Image.new('RGBA', (400, 400), (255, 255, 255, 0))
                
                # Calculate position to paste the scaled image (center it)
                x = (400 - img.size[0]) // 2
                y = (400 - img.size[1]) // 2
                
                # Paste the scaled image onto the white background
                new_img.paste(img, (x, y))
                
                # Save the scaled image, overwriting the original
                new_img.save(image_path)
                print(f"Scaled {filename}")
                
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

if __name__ == "__main__":
    scale_images()