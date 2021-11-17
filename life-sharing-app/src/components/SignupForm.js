// SignUp Form

import React,{useState,useContext} from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import {Context as AuthContext} from '../context/AuthContext';

const SignupForm = ({navigation}) => {
  const {state,signup}=useContext(AuthContext);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [number,setNumber]=useState('');
  const arr={name,email,password,number};
  return (
    <>
      <FormContainer>
        <FormInput title="Full Name" placeholder="John Smith" state={name} changestate={setName}/>
        <FormInput title="Email" placeholder="example@gmail.com" state={email} changestate={setEmail}/>
        <FormInput title="Password" placeholder="**********" state={password} changestate={setPassword}/>
        <FormInput title="Phone Number" placeholder="XXXXXX***" state={number} changestate={setNumber}/>
        {state.errorMessage?<Text style={styles.errorMessage}>{state.errorMessage}</Text>:null}
        <FormSubmitButton title="Sign up" onsubmit={signup} props={arr} navigation={navigation}/>
      </FormContainer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage:{
    fontSize:16,
    color:'red'
  }
});

export default SignupForm;
