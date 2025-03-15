// Code to fetch data from API
import {useState, useEffect} from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAPIData = async () => {
      try {
        const response = await fetch(
          'https://api.alquran.cloud/v1/quran/en.asad',
        );
        const jsonData = await response.json();
        setData(jsonData.data.surahs);
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
