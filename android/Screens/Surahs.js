import { StyleSheet, Text, View,TextInput, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';

const Surahs = () => {
    const [data,setdata]=useState([]);
const getAPIData = async() =>{
  const url = 'https://api.alquran.cloud/v1/quran/en.asad';
  const result = await fetch(url);
  const jsonData = await result.json();
  setdata(jsonData.data.surahs);
}
useEffect( ()=>{
  getAPIData();
},[]
)

  return (
    <View>
      <View>
        <TextInput
        style={{borderWidth:2 , fontSize:20}}
        placeholder='Search Syrah'
        ></TextInput>
      </View>
      <FlatList
      data={data}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={(item) => item.number}
      >
      </FlatList>
    </View>
  )
}

export default Surahs
const Item = ({item}) => {
    return (
        <View style={{flex:.5 }}>
            <Text style={{fontSize:20 , marginTop:10}} >
                {item.number}  {item.englishName}  {item.name} </Text>
        </View>
    );
};

const styles = StyleSheet.create({})