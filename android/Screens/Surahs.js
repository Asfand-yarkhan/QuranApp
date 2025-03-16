import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import  useFetch  from '../component/useFetch';
import SurahDetail from './SurahDetail';

const Surahs = () => {
    const { data, loading, error } = useFetch();
    const [selectedSurah, setSelectedSurah] = useState(null);

    if(loading) return <ActivityIndicator size = 'large' color = "black" />;
    if (error) return <Text>Error while fetching data</Text>;   

    return (
        <View style={styles.container}>
            {/* Agar surah select hai to details dikhaye, warna list dikhaye */}
            {selectedSurah ? (
                <View>
                    <Button title="Back" onPress={() => setSelectedSurah(null)} />
                    <Text style={styles.header}>{selectedSurah.englishName} - {selectedSurah.name}</Text>
                    <FlatList
                        data={selectedSurah.ayahs}
                        renderItem={({ item }) => (
                            <Text style={styles.ayahText}>
                                {item.numberInSurah}. {item.text}
                            </Text>
                        )}
                        keyExtractor={(item) => item.number.toString()}
                    />
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedSurah(item)}>
                            <Text style={styles.itemText}>
                                {item.number}. {item.englishName} ({item.name})
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.number.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    itemText: { fontSize: 20, padding: 10, borderBottomWidth: 1 },
    ayahText: { fontSize: 18, padding: 5 },
});

export default Surahs;
