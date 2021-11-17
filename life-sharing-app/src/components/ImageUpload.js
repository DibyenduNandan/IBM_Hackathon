// User profile image upload and update page

import React, { useState,useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';
import {Context as AuthContext} from '../context/AuthContext';

const ImageUpload = ({navigation}) => {
  const [profileImage, setProfileImage] = useState('');
  const [progress, setProgress] = useState(0);
  const {state}=useContext(AuthContext);
  const openImageLibariry = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      console.log(response,3);
      if (!response.cancelled) {
        await setProfileImage(response.uri);
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + '_profile',
      uri: profileImage,
      type: 'image/jpg',
    });

    try {
      const token=state.token;
      console.log(token);
      const res = await client.post('/upload-profile', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization:`Bearer${token}`,
        },
        onUploadProgress: ({ loaded, total }) =>
          setProfileImage(loaded / total),
      });
      navigation.navigate("AppScreen")
    } catch (error) {
      console.log("Cannot Upload")
      console.log(error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={openImageLibariry}
            style={styles.uploadBtn}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  opacity: 0.3,
                  fontWeight: 'bold',
                }}>
                Upload Profile Image
              </Text>
            )}
          </TouchableOpacity>
          {progress ? <Text>{progress}</Text> : null}
          <Text 
          onPress={()=>navigation.navigate("AppScreen")}
          style={styles.skip}>Skip</Text>
          <Text
            onPress={()=>uploadProfileImage()}
            style={[
              styles.skip,
              { backgroundColor: 'green', color: 'white', borderRadius: 8 },
            ]}>
            Upload
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
  },
  skip: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.3,
  },
});

export default ImageUpload;
