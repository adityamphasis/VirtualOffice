import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';

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

export async function getNetworkSpeed() {

    let frequency = await NetworkInfo.getFrequency();

    if (!frequency)
        return '0 B/s';

    let sizeIn = 'B';

    if (frequency >= 1024) {
        frequency = frequency / (1024);
        sizeIn = 'Kb/s';
    }

    if (frequency >= 1024) {
        frequency = frequency / (1024);
        sizeIn = 'Mb/s';
    }

    return frequency.toFixed(2) + ' ' + sizeIn;

}