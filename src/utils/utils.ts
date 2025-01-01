const getRecipeName = (name: string) => {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const formatArray = (arr: string[]) => {
    if (arr.length === 1) return arr[0];
    const firsts = arr.slice(0, arr.length - 1)
        .map((item) => getRecipeName(item))
        .join(', ');
    const last = getRecipeName(arr[arr.length - 1]);
    return firsts + ' and ' + last;
}

export { getRecipeName, formatArray };
