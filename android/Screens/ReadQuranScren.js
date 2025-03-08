import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useState} from 'react';
import React from 'react';
const ayahData = require('./ayah.json');

const ReadQuranScren = () => {
  const [data, setdata] = useState(ayahData);
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.Id}
      />
    </View>
  );
};

export default ReadQuranScren;
const Item = ({item}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.2, flexDirection: 'row'}}>
        <View style={styles.translation}>
          <Text>{item.Translation}</Text>
        </View>
        <View
          style={styles.arabic}>
          <Text>{item.AyahTextMuhammadi}</Text>
        </View>
      </View>
      <View style={{flex: 0.07, backgroundColor: 'gray'}}>
        <Text style={{textAlign: 'center'}}>
          پارہ {item.ParahNumber} سورةرکوع {item.SurahNumber}
        </Text>
      </View>
      <View
        style={{
          flex: 0.48,
          // backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{item.Tafseer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  translation: {
    flex: 0.5,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth:1,
  },
  arabic:
  {
    flex: 0.5,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth:1,
  }
});
