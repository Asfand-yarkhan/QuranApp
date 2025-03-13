import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import React from 'react';

const SurahDetail = ({ surah, onBack }) => {
    return (
        <View style={styles.container}>
            <Button title="Back" onPress={onBack} />
            <Text style={styles.header}>{surah.englishName} - {surah.name}</Text>
            <FlatList
                data={surah.ayahs} // Directly using fetched ayahs
                renderItem={({ item }) => (
                    <View style={styles.ayahContainer}>
                        <Text style={styles.ayahText}>
                            {item.numberInSurah}. {item.text}
                        </Text>
                    </View>
                )}
                keyExtractor={(item) => item.number.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    ayahContainer: { padding: 10, borderBottomWidth: 1 },
    ayahText: { fontSize: 18 },
});

export default SurahDetail;
