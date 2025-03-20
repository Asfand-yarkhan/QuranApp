import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FontContext } from '../../android/component/FontContext';


const Setting = () => {
    const { fontSize, setFontSize } = useContext(FontContext);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontSize }]}>
                This is a sample text
            </Text>
            <Button title="Increase Font" onPress={() => setFontSize(fontSize + 2)} />
            <Button title="Decrease Font" onPress={() => setFontSize(fontSize - 2)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontWeight: 'bold' },
});

export default Setting;
