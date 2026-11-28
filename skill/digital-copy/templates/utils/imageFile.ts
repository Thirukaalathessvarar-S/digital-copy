// the upload preset takes png only , up to 2 MB , so the forms check the same before uploading
const maxImageSize = 2 * 1024 * 1024;

export function isPng(file:File){
    return file.type==='image/png';
}

export function isSmallImage(file:File){
    return file.size <= maxImageSize;
}
