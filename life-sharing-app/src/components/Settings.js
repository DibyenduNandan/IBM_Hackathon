// Those user who wants to register them in our app this page code is for them so that they could register them as a doctor


import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Button,
  ScrollView,
} from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context as AuthContext } from '../context/AuthContext';

const Settings = ({ navigation }) => {
  const { doctorlogin, login, state, schedule } = useContext(AuthContext);
  const [Regno, setReg] = useState('');
  const [Regyear, setYear] = useState('');
  const [State, setState] = useState('');
  const [Specalization, setSpec] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const arr = { Regno, Regyear, State, Specalization };
  useEffect(() => {
    doctorlogin();
  }, []);
  if (state.islogin === false) {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.heading}>Sign Up As A Doctor</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <FormContainer>
            <FormInput
              title="Registation Number"
              placeholder="Your Doctor Registation Number"
              state={Regno}
              changestate={setReg}
            />
            <FormInput
              title="Year of Registration"
              placeholder="2000"
              state={Regyear}
              changestate={setYear}
            />
            <FormInput
              title="State"
              placeholder="West Bengal"
              state={State}
              changestate={setState}
            />
            <FormInput
              title="Specialization"
              placeholder="Cardiologist"
              state={Specalization}
              changestate={setSpec}
            />
            <FormSubmitButton title="Login" onsubmit={login} props={arr} />
          </FormContainer>
        </ScrollView>
      </View>
    );
  } else if (state.islogin === true) {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    const showTimepicker = () => {
      showMode('time');
    };

    const saveTime = () => {
      const currentDate = date.toString();
      schedule(currentDate);
    };

    return (
      <View>
        <Text style={styles.smallheading}>Schedule Your Appoinment Time</Text>
        <View style={{ padding: 20 }}>
          <Button
            onPress={showDatepicker}
            title="Select your appointment Date"
          />
        </View>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Button
            onPress={showTimepicker}
            title="Select your appointment Time"
          />
        </View>
        <View style={{ padding: 20 }}>
          <Button onPress={saveTime} title="Save your Schedule Time" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );
  } else {
    return (
      <>
        <View style={{ padding: 20 }}>
          <Button onPress={doctorlogin} title="Please Reload the Page" />
        </View>
      </>
    );
  }
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 40,
    color: '#1b1b33',
  },
  smallheading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 35,
    color: '#1b1b33',
  },
});

export default Settings;
