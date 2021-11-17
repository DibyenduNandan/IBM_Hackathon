// Login Form for user

import React,{useState,useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import {Context as AuthContext} from '../context/AuthContext';

const LoginForm = ({navigation}) => {
  const {state,signin}=useContext(AuthContext);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const arr={email,password};
  return (
    <>
      <FormContainer>
        <FormInput title="Email" placeholder="example@gmail.com" state={email} changestate={setEmail}/>
        <FormInput title="Password" placeholder="**********" state={password} changestate={setPassword}/>
        <FormSubmitButton title='Login' onsubmit={signin} props={arr} navigation={navigation}/>
      </FormContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
