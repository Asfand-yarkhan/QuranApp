import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { FontContext } from '../../android/component/FontContext';
import { SettingsContext } from '../../android/component/SettingsContext';

const Setting = () => {
  const { fontSize, setFontSize } = useContext(FontContext);
  const {
    translationLang,
    setTranslationLang,
    showTafseer,
    setShowTafseer,
  } = useContext(SettingsContext); // useContext directly here

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize }]}>This is a sample text</Text>

      {/* Font Size Controls */}
      <Button title="Increase Font" onPress={() => setFontSize(fontSize + 2)} />
      <Button title="Decrease Font" onPress={() => setFontSize(fontSize - 2)} />

      {/* Tafseer Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Show Tafseer</Text>
        <Switch value={showTafseer} onValueChange={setShowTafseer} />
      </View>

      {/* Translation Language Toggle */}
      <Button
        title={`Switch to ${translationLang === 'urdu' ? 'English' : 'Urdu'}`}
        onPress={() =>
          setTranslationLang(translationLang === 'urdu' ? 'english' : 'urdu')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default Setting;
