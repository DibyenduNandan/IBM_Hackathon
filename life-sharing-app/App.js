import React, { useRef, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from './src/screens/Signup';
import DoctorScreen from './src/screens/DoctorScreen';
import MedicineScreen from './src/screens/MedicalShopScreen';
import LoginScreen from './src/components/Settings';
import DonnerScreen from './src/screens/Blood_DonnerScreen';
import AccountScreen from './src/screens/AccountScreen';
import ShopLogin from './src/screens/ShopLogin';
import { FontAwesome5, Fontisto, AntDesign } from '@expo/vector-icons';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as DoctorProvider } from './src/context/DoctorContext';
import { Provider as ScheduleProvider } from './src/context/ScheduleContext';
import { Provider as DonnerProvider } from './src/context/DonnerContext';
import { Provider as ShopProvider } from './src/context/ShopContext';
import { Context as AuthContext } from './src/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageUpload from './src/components/ImageUpload';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          return route.name === 'Find Doctor' ? (
            <Fontisto name="doctor" size={24} color="black" />
          ) : route.name === 'Medical Shops' ? (
            <FontAwesome5 name="briefcase-medical" size={24} color="black" />
          ) : (
            <Fontisto name="blood-drop" size={24} color="black" />
          );
        },
      })}>
      <Tab.Screen
        name="Find Doctor"
        component={DoctorScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Medical Shops"
        component={MedicineScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Donner"
        component={DonnerScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const CustomDrawer = (props) => {
  const { state, signout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
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
          }}>
          <View>
            <Text>{state.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => state.route.navigate('Profile_Image')}>
            <Image
              source={
               state.b64? ({uri: state.b64,}):require('./image/Default_profile.jpg')
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => signout(state)}
        style={{
          position: 'absolute',
          bottom: 50,
          right: 0,
          left: 0,
          padding: 20,
          backgroundColor: '#f6f6f6',
        }}>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
          }}>
          <AntDesign name="logout" size={24} color="black" padding={20} />
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();
const AppScreen = ({ navigation }) => {
  // console.log(1,navigation.navigate)
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Manage Account" component={AccountScreen} />
      <Drawer.Screen name="Doctor Account" component={LoginScreen} />
      <Drawer.Screen name="Shop Account" component={ShopLogin} />
    </Drawer.Navigator>
  );
};

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Authantication"
        component={ResolveAuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile_Image"
        component={ImageUpload}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppScreen"
        component={AppScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <ShopProvider>
      <DonnerProvider>
        <ScheduleProvider>
          <DoctorProvider>
            <AuthProvider>
              <NavigationContainer>
                <StackScreen />
              </NavigationContainer>
            </AuthProvider>
          </DoctorProvider>
        </ScheduleProvider>
      </DonnerProvider>
    </ShopProvider>
  );
};
