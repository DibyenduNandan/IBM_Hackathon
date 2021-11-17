// This is reusable input code for all forms input


import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const LoginForm = ({ placeholder, title, state, changestate }) => {
  return (
    <>
      <Text style={{ fontWeight: 'bold' }}> {title} </Text>
      <TextInput
        autoCapitalize="none"
        placeholder={placeholder}
        style={styles.input}
        value={state}
        onChangeText={changestate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#1b1b33',
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default LoginForm;
