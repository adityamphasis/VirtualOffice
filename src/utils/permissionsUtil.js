import { PermissionsAndroid } from 'react-native';

export async function requestInstallUpdatePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.REQUEST_INSTALL_PACKAGES,
            {
                'title': 'Permission Required',
                'message': 'Install permission is needs to proceed further.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can now install updates");
            return true;
        } else {
            console.log("App install permission denied");
            return false;
        }
    } catch (err) {
        console.warn(err)
        return false;
    }
}


export async function requestStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'Permission Required',
                'message': 'Storage permission is needs to proceed further.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can now storage updates");
            return true;
        } else {
            console.log("App storage permission denied");
            return false;
        }
    } catch (err) {
        console.warn(err)
        return false;
    }
}