// Code for registration of the shop


import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet,View,ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormSubmitButton from '../components/FormSubmitButton';
import * as Location from 'expo-location';
import FormContainer from '../components/FormContainer';
import { Context as ShopContext } from '../context/ShopContext';

const ShopLogin = () => {
  const { createShop } = useContext(ShopContext);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      console.log(location);
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const arr = { name, address, phone, location };
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.heading}>Medicine Shop Login</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <FormContainer>
          <FormInput
            title="Name"
            placeholder="Shop Name"
            state={name}
            changestate={setName}
          />
          <FormInput
            title="Address"
            placeholder="Your Shop Address"
            state={address}
            changestate={setAddress}
          />
          <FormInput
            title="Phone No"
            placeholder="Shop Phone Number"
            state={phone}
            changestate={setphone}
          />
          <FormSubmitButton title="Login" onsubmit={createShop} props={arr} />
        </FormContainer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 40,
    color: '#1b1b33',
  },
});

export default ShopLogin;
