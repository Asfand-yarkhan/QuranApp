import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';


const HomeScreen = () => {
  const navigation =useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <View style={styles.container1}>
        <Text style={styles.quran}>Quran</Text>
        <Image
        style ={{height:110, width:110, marginTop: '25'}}
        source={{uri: 'https://parspng.com/wp-content/uploads/2022/09/quranpng.parspng.com-12.png'}}
        ></Image>
      </View>
      <View style={styles.feature}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Features</Text>
      </View>
      <View style={styles.container2}>
        <View style={styles.container21}>
          <TouchableOpacity style={styles.button1} onPress={()=>navigation.navigate('ReadQuran')}>
            <Icon  name="book-sharp"  style={styles.Icons}/>
            <Text style={{fontSize: 25}}>Read Quran</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
          <Icon  name="bookmarks-sharp"  style={styles.Icons}/>
            <Text style={{fontSize: 25}}>BookMark</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container22}>
          <TouchableOpacity style={styles.button1}>
          <Icon  name="search-sharp"  style={styles.Icons}/>
            <Text style={{fontSize: 25}}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
          <Icon  name="settings-sharp"  style={styles.Icons}/>
            <Text style={{fontSize: 25}}>Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  quran:{
    fontSize:35,
    fontWeight:'bold'
  },
  feature: {
    flex: 0.08,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 0.62,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  container21: {
    flex: 0.5,
    // backgroundColor: 'pink',
    justifyContent: 'space-evenly',
  },
  container22: {
    flex: 0.5,
    // backgroundColor: 'purple',
    justifyContent: 'space-evenly',
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 15,
    borderRadius: 4,
    borderWidth: 2,
  height:150,
  },
  Icons:{
    fontSize:50,
    marginBottom:10,
  }
});
