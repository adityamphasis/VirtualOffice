import DeviceInfo from 'react-native-device-info';

export async function isSuficientSpace() {
    const freeSpace = await DeviceInfo.getFreeDiskStorage();
    console.log('freeSpace', freeSpace.toFixed(2));
    console.log('re space', (200 * 1024 * 1024))
    return freeSpace.toFixed(2) > (200 * 1024 * 1024);
}


export async function getAvailableFreeSpace() {

    let freeSpace = await DeviceInfo.getFreeDiskStorage();

    if (!freeSpace)
        return '0 B';

    let sizeIn = 'B';

    if (freeSpace >= 1024) {
        freeSpace = freeSpace / (1024);
        sizeIn = 'KB';
    }

    if (freeSpace >= 1024) {
        freeSpace = freeSpace / (1024);
        sizeIn = 'MB';
    }

    if (freeSpace >= 1024) {
        freeSpace = freeSpace / (1024);
        sizeIn = 'GB';
    }

    if (freeSpace >= 1024) {
        freeSpace = freeSpace / (1024);
        sizeIn = 'TB';
    }

    return freeSpace.toFixed(2) + ' ' + sizeIn;

}
