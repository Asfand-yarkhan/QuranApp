// Code to fetch data from API
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAPIData = async () => {
      try {
        setLoading(true);
        const storedData = await AsyncStorage.getItem('surahs');
        if (storedData) {
          setData(JSON.parse(storedData));
          setLoading(false);
          return;
        }
        const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad',);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const jsonData = await response.json();
        setData(jsonData.data.surahs);
        await AsyncStorage.setItem(
          'surahs',
          JSON.stringify(jsonData.data.surahs),
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getAPIData();
  }, []);
  return {data, loading, error};
};

export default useFetch;
