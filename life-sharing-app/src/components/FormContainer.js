import * as React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

const FormContainer = ({ children }) => {
  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        {children}
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    paddingTop:60,
  },
});

export default FormContainer;