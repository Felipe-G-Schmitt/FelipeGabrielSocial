import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import db from './firebaseConfig';

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = collection(db, 'images');
      const docRef = await addDoc(ref, { image: blob });

      console.log('Image uploaded with ID: ', docRef.id);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Upload image" onPress={uploadImage} disabled={!image} />
    </View>
  );
};

export default ImageUploadComponent;
