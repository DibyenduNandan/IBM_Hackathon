import React, { useEffect } from 'react';
import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/client';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'log':
      return { ...state, islogin: action.logged };
    case 'login':
      return { ...state, islogin: action.payload };
    case 'signin':
      return {
        errorMessage: '',
        token: action.payload,
        route: action.nav,
        b64: action.profile,
        email: action.email,
      };
    case 'Profile_Image':
      return { ...state };
    case 'signout':
      return { token: null, errorMessage: '', route: '' };
    default:
      return state;
  }
};

const doctorlogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await trackerApi.get('/tracks', {
    headers: {
      authorization: `Bearer${token}`,
    },
  });
  // console.log(response.data);
  if (response.data.length != 0) {
    dispatch({
      type: 'log',
      logged: true,
    });
  } else {
    dispatch({
      type: 'log',
      logged: false,
    });
  }
};

const login = (dispatch) => async (props) => {
  const { Regno, Regyear, State, Specalization } = props;
  console.log(props);
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  if (token) {
    console.log(1);
    const response = await trackerApi.post('/tracks', {
      headers: {
        authorization: `Bearer${token}`,
      },
      Regno,
      Regyear,
      State,
      Specalization,
    });
    console.log(response);
    dispatch({
      type: 'login',
      payload: true,
    });
  }
};

const schedule = (dispatch) => async (props) =>{
  const date = props;
  console.log(date,props,44);
  try {
    const response = await trackerApi.post('/schedule', {
      date
    });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
}

const tryLocalSignin = (dispatch) => async (navigation) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    // console.log(token, 'checking');
    const response = await trackerApi.get('/', {
      headers: {
        authorization: `Bearer${token}`,
      },
    });
    // console.log(response);
    dispatch({
      type: 'signin',
      payload: token,
      nav: navigation,
      profile: response.data.base64Icon,
      email: response.data.email,
    });
    navigation.navigate('AppScreen');
  } else {
    navigation.navigate('Signup');
  }
};

const signup = (dispatch) => async (props, navigation) => {
  console.log(props);
  const { email, password, name, number } = props;
  try {
    const response = await trackerApi.post('/signup', {
      email,
      password,
      name,
      number,
    });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token, nav: navigation,email:response.data.email });
    navigation.navigate('Profile_Image');
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

const signin = (dispatch) => async (props, navigation) => {
  const { email, password } = props;
  console.log(email, password);
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    await console.log(response);
    dispatch({
      type: 'signin',
      payload: response.data.token,
      nav: navigation,
      profile: response.data.base64Icon,
      email: response.data.email,
    });
    navigation.navigate('AppScreen');
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

const signout = (dispatch) => async (state) => {
  await AsyncStorage.removeItem('token');
  await state.route.navigate('Signup');
  dispatch({ type: 'signout' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, tryLocalSignin, doctorlogin, login,schedule },
  {
    token: null,
    errorMessage: '',
    route: '',
    b64: null,
    email: '',
    islogin: '',
    schedule:'',
  }
);
