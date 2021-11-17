// This code wil show user there account details


import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Switch,
  FlatList,
  Button,
  Linking,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Fontisto, AntDesign } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ScheduleContext } from '../context/ScheduleContext';
import { Context as ShopContext } from '../context/ShopContext';

const Tab = createBottomTabNavigator();

// This uri contains the deployed link ok the video calling application this will connect user and doctor through live video call

const url = 'https://video-callingapplication.herokuapp.com/';

const handleClick = () => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + this.props.url);
    }
  });
};

const DoctorScreen = () => {
  // This function will display all doctor schedule time
  const { state, findSchedule } = useContext(ScheduleContext);
  const [isdoctor, setisDoctor] = useState(false);
  const doctorRefresh = () => {
    setisDoctor(true);
    findSchedule();
    setisDoctor(false);
  };
  useEffect(() => {
    findSchedule();
  }, []);
  return (
    <>
      <Text style={styles.smallheading}>Yours Schedule Meeting</Text>
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
                  paddingLeft: 10,
                }}>
                {item.Date ? (
                  <>
                    <Button onPress={() => handleClick()} title="Join" />
                    <View style={{ marginLeft: 15 }}>
                      <Text style={{ fontSize: 15, color: '#1b1b33' }}>
                        Date:{item.Date}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#1b1b33',
                        marginLeft: 18,
                      }}>
                      You dosenot have any Scheduled Meeting
                    </Text>
                  </>
                )}
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

const MedicineScreen = () => {
  // This function will display all details of medical shop that user have
  const { state, userShop } = useContext(ShopContext);
  const [isshop, setisShop] = useState(false);
  const shopRefresh = () => {
    setisShop(true);
    userShop();
    setisShop(false);
  };
  useEffect(() => {
    userShop();
  }, []);
  return (
    <>
      <Text style={styles.smallheading2}>Yours Shop Details</Text>
      <FlatList
        data={state.user}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
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
                <View style={{ paddingLeft: 20 }}>
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

const DonnerScreen = () => {
  // This function will allow user to become an active donner
  const { state, active_donner } = useContext(ScheduleContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (!isEnabled) {
      const donner = !isEnabled;
      const user = state[0].userId;
      const props = { donner, user };
      active_donner(props);
    } else {
      const donner = !isEnabled;
      const user = state[0].userId;
      const props = { donner, user };
      active_donner(props);
    }
  };
  return (
    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 12 }}>
      <Text style={{ fontSize: 18 }}>Click here to become a active donner</Text>
      <View style={{ borderColor: 'red' }}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const AccountScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          return route.name === 'Doctor Profile' ? (
            <Fontisto name="doctor" size={24} color="black" />
          ) : route.name === 'Shops Details' ? (
            <FontAwesome5 name="briefcase-medical" size={24} color="black" />
          ) : (
            <Fontisto name="blood-drop" size={24} color="black" />
          );
        },
      })}>
      <Tab.Screen
        name="Doctor Profile"
        component={DoctorScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Shops Details"
        component={MedicineScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Donner Settings"
        component={DonnerScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  smallheading: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 35,
    color: '#1b1b33',
  },
  smallheading2: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 80,
    color: '#1b1b33',
  },
});

export default AccountScreen;
