// Sign up page


import React, { useRef,useState,useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import ImageUpload from '../components/ImageUpload';
import FormHeader from '../components/Formheader';
import FormSelectorBtn from '../components/FormSelectorButton';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import ResolveAuthScreen from './ResolveAuthScreen';

const { width } = Dimensions.get('window');

const SignupScreen = ({navigation}) => {
  // console.log(1,navigation.navigate);
  const animation = useRef(new Animated.Value(0)).current;
  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });

  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  });

  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });

  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)'],
  });

  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)'],
  });

  return (
      <View style={{ flex: 1, paddingTop: 60 }}>
        <ResolveAuthScreen navigation={navigation}/>
        <View style={{ height: 80 }}>
        <FormHeader
          leftheading="Welcome"
          rightheading="Back"
          subheading="Life Sharing App"
          rightHeaderOpacity={rightHeaderOpacity}
          leftHeaderTranslateX={leftHeaderTranslateX}
          rightHeaderTranslateY={rightHeaderTranslateY}
        />
        <View style={{ flexDirection: 'row', marginBottom: 20, padding: 20 }}>
          <FormSelectorBtn
            style={styles.borderLeft}
            backgroundColor={loginColorInterpolate}
            title="Login"
          />
          <FormSelectorBtn
            style={styles.borderRight}
            backgroundColor={signupColorInterpolate}
            title="Sign Up"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}>
        <LoginForm navigation={navigation}/>
        <ScrollView>
          <SignupForm navigation={navigation}/>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default SignupScreen;
