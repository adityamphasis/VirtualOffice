import React from 'react';
import { Platform, View, StyleSheet, Modal, ActivityIndicator } from 'react-native';

const Loader = ({ visible }) => (
    <Modal transparent visible={visible}>
        <View style={styles.MainContainer}>
            <ActivityIndicator size='large' color={'rgb(30,77,155)'} />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    MainContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9
    }
});

export default Loader;