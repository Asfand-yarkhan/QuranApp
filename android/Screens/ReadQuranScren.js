import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { SettingsContext } from '../../android/component/SettingsContext';

// Surah 114 (An-Nas) data as fallback
const SURAH_114_DATA = [
  {
    Id: 6231,
    SurahNumber: 114,
    AyahNumber: 1,
    ParahNumber: 30,
    AyahTextMuhammadi: "قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ",
    Translation: "کہو میں پناہ مانگتا ہوں انسانوں کے رب کی",
    Tafseer: "سورہ الناس۔۔۔"
  },
  {
    Id: 6232,
    SurahNumber: 114,
    AyahNumber: 2,
    ParahNumber: 30,
    AyahTextMuhammadi: "مَلِكِ النَّاسِۙ",
    Translation: "انسانوں کے بادشاہ کی",
    Tafseer: "سورہ الناس۔۔۔"
  },
  {
    Id: 6233,
    SurahNumber: 114,
    AyahNumber: 3,
    ParahNumber: 30,
    AyahTextMuhammadi: "اِلٰهِ النَّاسِۙ",
    Translation: "انسانوں کے معبود کی",
    Tafseer: "سورہ الناس۔۔۔"
  },
  {
    Id: 6234,
    SurahNumber: 114,
    AyahNumber: 4,
    ParahNumber: 30,
    AyahTextMuhammadi: "مِنْ شَرِّ الْوَسْوَاسِ الْخَـنَّاسِۙ",
    Translation: "وسوسہ ڈالنے والے کے شر سے جو ہٹ جاتا ہے",
    Tafseer: "سورہ الناس۔۔۔"
  },
  {
    Id: 6235,
    SurahNumber: 114,
    AyahNumber: 5,
    ParahNumber: 30,
    AyahTextMuhammadi: "الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ",
    Translation: "جو لوگوں کے دلوں میں وسوسے ڈالتا ہے",
    Tafseer: "سورہ الناس۔۔۔"
  },
  {
    Id: 6236,
    SurahNumber: 114,
    AyahNumber: 6,
    ParahNumber: 30,
    AyahTextMuhammadi: "مِنَ الْجِنَّةِ وَ النَّاسِ",
    Translation: "وہ جنوں میں سے ہو یا انسانوں میں سے",
    Tafseer: "سورہ الناس۔۔۔"
  }
];

// Import only current surah data instead of all ayahs
const getSurahData = (surahNumber) => {
  try {
    // Special case for Surah 114 (An-Nas)
    if (Number(surahNumber) === 114) {
      console.log("Using hardcoded data for Surah 114 (An-Nas)");
      return SURAH_114_DATA;
    }
    
    // For other surahs, try to get from JSON
    const data = require('./ayah.json');
    
    // Convert both to numbers to ensure proper comparison
    const filteredData = data.filter(item => Number(item.SurahNumber) === Number(surahNumber));
    console.log(`Filtering for surah ${surahNumber}, found ${filteredData.length} ayahs`);
    
    // If no data found for this surah, try with surah 1 as fallback
    if (filteredData.length === 0) {
      console.log(`No data found for surah ${surahNumber}, using surah 1 as fallback`);
      return data.filter(item => Number(item.SurahNumber) === 1);
    }
    
    return filteredData;
  } catch (error) {
    console.error("Error loading ayah.json:", error);
    // Return empty array as absolute fallback
    return [];
  }
};

// Dummy data for emergency fallback
const EMERGENCY_FALLBACK = [
  {
    Id: 1,
    SurahNumber: 1,
    AyahNumber: 1,
    ParahNumber: 1,
    AyahTextMuhammadi: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    Translation: "اللہ کےنام سے جو رحمان و رحیم ہے",
    Tafseer: "سورة الْفَاتِحَة 1..."
  }
];

const ReadQuranScren = () => {
  const { translationLang, showTafseer } = useContext(SettingsContext);
  const [mergedData, setMergedData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0); // Tracks current Surah
  const [error, setError] = useState(null);

  // Function to fetch and merge data
  const fetchData = async (surahIndex) => {
    console.log(`Fetching data for surah index: ${surahIndex}`);
    setIsLoading(true);
    setError(null);
    
    try {
      const surahNumber = surahIndex + 1;
      console.log(`Getting data for surah number: ${surahNumber}`);
      
      // First get local Urdu data - fail fast if this doesn't work
      const urduSurah = getSurahData(surahNumber);
      
      if (!urduSurah || urduSurah.length === 0) {
        console.error(`No local data found for surah ${surahNumber}`);
        throw new Error(`No local data for surah ${surahNumber}`);
      }
      
      console.log(`Found ${urduSurah.length} ayahs in local data`);
      
      // Try to get English translation
      let englishAyahs = [];
      try {
        console.log(`Fetching from API: https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`);
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`);
        const json = await response.json();
        
        if (json.data && json.data.ayahs) {
          englishAyahs = json.data.ayahs;
          console.log(`Found ${englishAyahs.length} English translations from API`);
        } else {
          console.warn("API response doesn't contain expected data structure");
        }
      } catch (apiError) {
        console.warn("API fetch error:", apiError);
        // Continue with empty English translations
      }

      // Combine Urdu and English data
      const combined = urduSurah.map((item, index) => ({
        ...item,
        englishText: (englishAyahs[index] && englishAyahs[index].text) || '',
        key: `surah-${surahNumber}-ayah-${item.AyahNumber || index}`,
        // Adding a special flag for the last ayah in the surah
        isLastAyahInSurah: index === urduSurah.length - 1
      }));

      console.log(`Setting ${combined.length} merged ayahs to state`);
      setMergedData(combined);
    } catch (err) {
      console.error('Error in fetchData:', err);
      setError(err.message);
      
      // EMERGENCY FALLBACK - Always show something
      console.log("Using emergency fallback data");
      setMergedData(EMERGENCY_FALLBACK.map((item, index) => ({
        ...item,
        englishText: '',
        key: `emergency-fallback-${index}`
      })));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentSurahIndex);
  }, [currentSurahIndex]);

  // Scroll to next Surah
  const loadNextSurah = () => {
    if (!isLoading) {
      console.log("Loading next surah");
      const nextIndex = (currentSurahIndex + 1) % 114; // There are 114 surahs in Quran
      setCurrentSurahIndex(nextIndex);
    }
  };

  // Scroll to previous Surah
  const loadPreviousSurah = async () => {
    console.log("Pull to refresh - loading previous surah");
    setIsRefreshing(true);
    
    try {
      const previousIndex = (currentSurahIndex - 1 + 114) % 114; // 114 total surahs
      console.log(`Previous index calculated as: ${previousIndex}`);
      
      // Just change the index, the useEffect will handle loading
      setCurrentSurahIndex(previousIndex);
      
      // Wait a bit to ensure the effect has time to run
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (err) {
      console.error("Error in loadPreviousSurah:", err);
      Alert.alert("Error", "Could not load previous surah");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Add this function to handle viewing item
  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const lastItem = viewableItems[viewableItems.length - 1];
      if (lastItem.item.isLastAyahInSurah) {
        console.log("Reached the last ayah in the surah, ready to load next surah");
        // Don't automatically load next surah, wait for user to scroll more
      }
    }
  }, []);

  // Display loading indicator for initial load
  if (isLoading && mergedData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Surah...</Text>
      </View>
    );
  }
  
  // Display error state
  if (error && mergedData.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading data: {error}</Text>
        <Text style={styles.errorHelp}>Pull down to refresh and try again</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
      
      {/* Debug info - remove in production */}
      <View style={styles.debugInfo}>
        <Text>Surah: {currentSurahIndex + 1}, Ayahs: {mergedData.length}</Text>
      </View>
      
      <FlatList
        data={mergedData}
        renderItem={({ item, index }) => (
          <Item 
            item={item} 
            translationLang={translationLang} 
            showTafseer={showTafseer}
            isLastItem={index === mergedData.length - 1}
          />
        )}
        keyExtractor={item => item.key || item.Id?.toString() || Math.random().toString()}
        onEndReached={loadNextSurah}
        onEndReachedThreshold={0.5} // Increased threshold to load earlier
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadPreviousSurah} />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No data available</Text>
            <Text>Pull down to refresh</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.surahTransitionContainer}>
            <Text style={styles.surahTransitionText}>
              End of Surah {currentSurahIndex + 1}
            </Text>
            <Text style={styles.surahTransitionSubtext}>
              Continue scrolling for next surah
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const Item = ({ item, translationLang, showTafseer, isLastItem }) => {
  if (!item) return null;
  
  const displayTranslation = translationLang === 'urdu' ? item.Translation : item.englishText;

  return (
    <View style={[
      styles.itemContainer,
      item.isLastAyahInSurah && styles.lastAyahContainer
    ]}>
      <View style={styles.ayahRow}>
        <View style={styles.translation}>
          <Text style={styles.translationText}>{displayTranslation || 'Translation not available'}</Text>
        </View>
        <View style={styles.arabic}>
          <Text style={styles.arabicText}>{item.AyahTextMuhammadi || 'Arabic text not available'}</Text>
        </View>
      </View>
      <View style={styles.infoBar}>
        <Text style={styles.infoText}>
          پارہ {item.ParahNumber || '-'} سورةرکوع {item.SurahNumber || '-'} آیہ {item.AyahNumber || '-'}
        </Text>
      </View>
      {showTafseer && item.Tafseer && (
        <View style={styles.tafseerContainer}>
          <Text style={styles.tafseerText}>{item.Tafseer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  errorHelp: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 5,
    borderRadius: 5,
    zIndex: 1000,
  },
  debugInfo: {
    padding: 5,
    backgroundColor: '#ffe',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemContainer: {
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: 'white',
  },
  ayahRow: {
    flexDirection: 'row',
    minHeight: 100,
  },
  translation: {
    flex: 0.5,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    padding: 10,
  },
  translationText: {
    textAlign: 'left',
    fontSize: 16,
  },
  arabic: {
    flex: 0.5,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    padding: 10,
  },
  arabicText: {
    fontSize: 22,
    textAlign: 'right',
  },
  infoBar: {
    backgroundColor: '#e0e0e0',
    padding: 5,
  },
  infoText: {
    textAlign: 'center',
    color: '#333',
  },
  tafseerContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  tafseerText: {
    textAlign: 'right',
    fontSize: 15,
    lineHeight: 24,
  },
  lastAyahContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#3498db',
    marginBottom: 20
  },
  surahTransitionContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    marginVertical: 10,
    borderRadius: 8
  },
  surahTransitionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  surahTransitionSubtext: {
    fontSize: 14,
    color: '#666'
  }
});

export default ReadQuranScren;
