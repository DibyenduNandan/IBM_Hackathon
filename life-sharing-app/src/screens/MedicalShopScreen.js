// This code will display all medical shop present nearby you wih there location


import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, ActivityIndicator,View,FlatList } from 'react-native';
import MapView from 'react-native-maps';
import { Context as ShopContext } from '../context/ShopContext';
import * as Location from 'expo-location';

const MedicineScreen = () => {
  const { state,all_Shop } = useContext(ShopContext);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isshop, setisShop] = useState(false);
  const shopRefresh = () => {
    setisShop(true);
    all_Shop();
    setisShop(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      console.log(status);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  
  return (
    <>
      {state.shop ? (
        location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
              longitudeDelta: 0.01,
              latitudeDelta: 0.01,
            }}>
            {state.shop.map((shop) => (
              <MapView.Marker
                coordinate={shop.location[0].coords}
                title={shop.name}
              />
            ))}
          </MapView>
        ) : null
      ) : null}
      <Text style={styles.smallheading2}>Shops Near You</Text>
      <FlatList
        data={state.shop}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          console.log(item,"user shop");
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
                <View style={{paddingLeft:20}}>
                  <Text>Name:{item.name}</Text>
                  <Text>Address:{item.address}</Text>
                  <Text>Phone Number:{item.phone}</Text>
                </View>
              </View>
            </>
          );
        }}
        onRefresh={shopRefresh}
        refreshing={isshop}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  smallheading2: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 80,
    color: '#1b1b33',
  },
});

export default MedicineScreen;
