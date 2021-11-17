// This code will display all doctor available


import React, { useState, useEffect, useContext } from 'react';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import FormSubmitButton from '../components/FormSubmitButton';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Linking,
} from 'react-native';
import { Context as DoctorContext } from '../context/DoctorContext';
import { Context as ShopContext } from '../context/ShopContext';

// This uri contains the deployed link ok the video calling application this will connect user and doctor through live video call

const url = "https://video-callingapplication.herokuapp.com/";

const handleClick = () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };

const DoctorScreen = () => {
  const { finddoctor, state } = useContext(DoctorContext);
  const { all_Shop } = useContext(ShopContext);
  const [isdoctor, setisDoctor] = useState(false);
  const doctorRefresh = () => {
    setisDoctor(true);
    finddoctor();
    setisDoctor(false);
  };
  useEffect(() => {
    finddoctor();
    all_Shop();
  }, []);
  console.log(state);
  return (
    <>
      <Text style={styles.heading}>Doctors Available</Text>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                  paddingTop: 10,
                  alignItems: 'center',
                  backgroundColor: '#f6f6f6',
                  marginBottom: 20,
                  borderColor: 'red',
                  paddingLeft: 5,
                }}>
                <Image
                  source={
                    item.avtar?({
                    uri: 'data:image/png;base64,' + item.avtar,
                  }):require('../../image/Default_profile.jpg')}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                  }}
                />
                <View>
                  <Text style={styles.smallheading}>Name:{item.name}</Text>
                  <Text style={styles.smallheading}>
                    Specialization:{item.Spec}
                  </Text>
                  <Text style={styles.smallheading}>
                    Registration No:{item.Regno}
                  </Text>
                  <Text style={styles.smallheading}>Date:{item.Date}</Text>
                  <View style={{paddingRight:50,paddingTop:5}}>
                  <Button onPress={()=>handleClick()} title="Join live to doctor"/>
                  </View>
                </View>
              </View>
            </>
          );
        }}
        onRefresh={doctorRefresh}
        refreshing={isdoctor}
      />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 55,
    paddingBottom:6,
    color: '#1b1b33',
  },
  smallheading: {
    fontSize: 15,
    color: '#1b1b33',
  },
});

export default DoctorScreen;
