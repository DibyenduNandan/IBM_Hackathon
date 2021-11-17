// This is form header code for signin and signup pages



import * as React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';

const FormHeader = ({
  leftheading,
  rightheading,
  subheading,
  leftHeaderTranslateX=40,
  rightHeaderTranslateY=-20,
  rightHeaderOpacity=0,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.heading,
            { transform: [{ translateX: leftHeaderTranslateX }] },
          ]}>
          {' '}
          {leftheading}{' '}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity: rightHeaderOpacity,
              transform: [{translateY: rightHeaderTranslateY}],
            },
          ]}>
          {' '}
          {rightheading}{' '}
        </Animated.Text>
      </View>
      <Text style={styles.subheading}> {subheading} </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1b1b33',
  },
  subheading: {
    fontSize: 18,
    color: '#1b1b33',
    textAlign: 'center',
  },
});

export default FormHeader;
