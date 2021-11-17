import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';

const FormSubmitButton = ({ placeholder,onsubmit,title,props,navigation}) => {
  // console.log(navigation.navigate);
  // console.log(props);
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={()=>onsubmit(props,navigation)}>
      <Text style={{fontSize:18,color:'#fff'}}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height:45,
    backgroundColor:'rgba(27,27,51,1)',
    borderRadius:8,
    justifyContent:'center',
    alignItems:"center",

  },
});

export default FormSubmitButton;
