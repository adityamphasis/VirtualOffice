import { from } from 'mute-stream';
import React, { useState } from 'react';
import {
    Platform, View, StyleSheet, Image,
    ImageBackground, Text, NativeModules, Linking, ActivityIndicator
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const android = RNFetchBlob.android;

import { ButtonOutline } from './index';

import { requestInstallUpdatePermission } from '../src/utils/permissionsUtil';

const link = 'https://play.google.com/store/apps/details?id=';

const requestPermissionAndInstall = async (filePath) => {

    let canInstall = await requestInstallUpdatePermission();
    if (canInstall) {
        android.actionViewIntent(filePath, 'application/vnd.android.package-archive');
        return;
    }

    requestPermissionAndInstall();
}

const onInstallUpdatePress = async (item) => {

    console.log('item', JSON.stringify(item));

    if (Platform.OS == 'android') {

        const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/' + item.appName + '.apk';
        const isExists = await RNFetchBlob.fs.exists(filePath);

        if (isExists) {
            requestPermissionAndInstall(filePath);
            return;
        }

        Linking.openURL(link + item.packageName);

    } else {

        if (item.AppDownloadLink != '') {
            Linking.openURL(item.AppDownloadLink);
            return;
        }

        if (item.iosId != '') {
            Linking.openURL("https://apps.apple.com/us/app/" + item.iosId);
            return;
        }

        alert('Application details not available.');

    }

}

const InstallItem = ({ item }) => {

    return (
        <ImageBackground
            style={[styles.bgItem, { borderColor: item.updateRequired ? 'red' : '#a4a4a4' }]}
            source={require('../assets/grad.png')}>

            <View style={{ flex: 2.5, alignItems: 'center' }}>
                <Image style={[{ height: 40, width: 40, margin: 10 }]}
                    resizeMode='contain'
                    source={item.icon} />
                <Text style={styles.title}>{item.appName}</Text>
            </View>
            <View style={{ width: 1, backgroundColor: 'grey', height: '90%' }} />
            {item.isFetching ? <View style={{ flex: 4, alignItems: 'center', paddingLeft: 30, paddingRight: 30, justifyContent: 'center' }}>
                <ActivityIndicator size={40} color={'blue'} />
            </View> :
                <View style={{ flex: 4, alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
                    {item.updateRequired && <Text style={{ fontSize: 10, color: 'red', textAlign: 'center' }}>{'Update Required'}</Text>}
                    {(!item.isInstalled && !item.isExists) && <ButtonOutline
                        onPress={() => onInstallUpdatePress(item)}
                        textColor='rgb(30,77,155)'
                        borderColor='green'
                        title={'Get'} />}
                    {(item.isExists && !item.isInstalled) && <ButtonOutline
                        onPress={() => onInstallUpdatePress(item)}
                        textColor='rgb(30,77,155)'
                        borderColor='green'
                        title={'Install'} />}
                    {item.isInstalled && !item.isLatest && <ButtonOutline
                        onPress={() => onInstallUpdatePress(item)}
                        textColor='rgb(30,77,155)'
                        borderColor='yellow'
                        title={'Update'} />}
                    {item.isInstalled && item.isLatest &&
                        <Text style={styles.text}>{'Installed'}</Text>}
                    {item.isInstalled &&
                        <Text style={styles.lastUpdate}>{'Last Updated on ' + item.lastUpdated}</Text>}
                </View>}

        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    bgItem: {
        borderColor: '#a4a4a4',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(30,77,155)',
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(30,77,155)',
        textAlign: 'center'
    },
    lastUpdate: {
        fontSize: 12,
        color: 'rgb(30,77,155)',
        textAlign: 'center'
    }
});


export default InstallItem;
