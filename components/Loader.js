import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Loader = ({ visible }) => (
    <Modal transparent visible={visible}>
        <View style={styles.MainContainer}>
            <ActivityIndicator size='large' color={'green'} />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    MainContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});

export default Loader;