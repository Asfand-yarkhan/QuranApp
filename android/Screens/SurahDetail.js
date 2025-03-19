import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

const SurahDetail = ({ surah, onBack }) => {
    const [highlightedAyah, setHighlightedAyah] = useState(null);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < surah.ayahs.length) {
                setHighlightedAyah(surah.ayahs[index].number);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 3000); // Reduced interval for better visibility

        return () => clearInterval(interval);
    }, [surah]);

    return (
        <View style={styles.container}>
            <Button title="Back" onPress={onBack} />
            <Text style={styles.header}>{surah.englishName} - {surah.name}</Text>
            <FlatList
                data={surah.ayahs}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setHighlightedAyah(item.number)}>
                        <View style={[styles.ayahContainer, highlightedAyah === item.number && styles.highlight]}>
                            <Text style={[styles.ayahText, highlightedAyah === item.number && styles.highlightedText]}>
                                {item.numberInSurah}. {item.text}
                            </Text>
                        </View>
                    </TouchableOpacity>
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
    highlight: { backgroundColor: 'yellow' }, // Highlight color
    highlightedText: { fontWeight: 'bold', color: 'black' }, // Extra text styling for visibility
});

export default SurahDetail;
