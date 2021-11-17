// This code will display all donner available at that point of time


import React, { useEffect, useContext,useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { Context as DonnerContext } from '../context/DonnerContext';
import { encode as btoa } from 'base-64';

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const DonnerScreen = () => {
  const { all_donners, state } = useContext(DonnerContext);
  const [isdonner, setisDoner] = useState(false);
  const donnerRefresh = () => {
    setisDoner(true);
    all_donners();
    setisDoner(false);
  };
  useEffect(() => {
    all_donners();
  }, []);
  // console.log(state,100)
  return (
    <>
      <Text style={styles.heading}>Doners Available</Text>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 10,
                  paddingTop: 10,
                  alignItems: 'center',
                  backgroundColor: '#f6f6f6',
                  marginBottom: 20,
                  paddingLeft: 5,
                }}>
                <Image
                  source={
                    item.avtar?({
                    uri:
                      'data:image/png;base64,' +
                      arrayBufferToBase64(item.avtar.data),
                  }):require('../../image/Default_profile.jpg')}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                  }}
                />
                <View style={{paddingLeft:20}}>
                  <Text>Name:{item.name}</Text>
                  <Text>Number:{item.number}</Text>
                </View>
              </View>
            </>
          );
        }}
        onRefresh={donnerRefresh}
        refreshing={isdonner}
      />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 60,
    paddingBottom: 6,
    color: '#1b1b33',
  },
  smallheading: {
    fontSize: 15,
    color: '#1b1b33',
  },
});

export default DonnerScreen;
