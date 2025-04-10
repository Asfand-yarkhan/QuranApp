import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, RefreshControl } from 'react-native';

const SurahDetail = ({ route, navigation }) => {
    // Destructure the passed props from route
    const { surah, onBack } = route.params; 

    const [isRefreshing, setIsRefreshing] = useState(false); // For controlling refresh state
    const [currentSurah, setCurrentSurah] = useState(surah); // State to hold current Surah data

    // Fetch previous Surah data
    const fetchPreviousSurah = async () => {
        try {
            setIsRefreshing(true);
            const previousIndex = currentSurah.number - 1 >= 1 ? currentSurah.number - 1 : 114; // Wrap to last Surah (114)
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${previousIndex}/en.asad`);
            const json = await response.json();
            setCurrentSurah(json.data); // Set the newly fetched Surah data
            setIsRefreshing(false); // Stop the refreshing spinner
        } catch (error) {
            console.log('Error fetching previous Surah:', error);
            setIsRefreshing(false); // Stop spinner if error occurs
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button to navigate to the previous screen */}
            <Button title="Back" onPress={onBack} />

            {/* Surah Header */}
            <Text style={styles.header}>{currentSurah.englishName} - {currentSurah.name}</Text>

            {/* FlatList to display Ayahs */}
            <FlatList
                data={currentSurah.ayahs} // Display the ayahs of the current Surah
                renderItem={({ item }) => (
                    <View style={styles.ayahContainer}>
                        <Text style={styles.ayahText}>
                            {item.numberInSurah}. {item.text}
                        </Text>
                    </View>
                )}
                keyExtractor={(item) => item.numberInSurah.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing} // Show refresh spinner
                        onRefresh={fetchPreviousSurah} // Function to fetch previous Surah
                        colors={['#9Bd35A', '#689F38']} // Spinner color
                        progressBackgroundColor="#fff" // Background color of the spinner
                    />
                }
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
