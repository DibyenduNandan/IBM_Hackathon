import React, { useContext, useEffect,useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const InitialRegion = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
      console.log(location.coords)
      return location.coords;
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
}

const styles = StyleSheet.create({
});

export default InitialRegion;

