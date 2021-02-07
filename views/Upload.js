import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Input, Text, Image, Button, Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag} from '../hooks/ApiHooks';
import useUploadForm from '../hooks/UploadHooks';
import {MainContext} from '../contexts/MainContext';
import {appIdentifier} from '../utils/variables';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [filetype, setFiletype] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const {upload} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {handleInputChange, inputs, uploadErrors, reset} = useUploadForm();

  const doUpload = async () => {
    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);

    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `${filetype}/${match[1]}` : filetype;

    if (type === 'image/jpg') type = 'image/jpeg';
    formData.append('file', {
      uri: image,
      name: filename,
      type: type,
    });

    try {
      setIsUploading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await upload(formData, userToken);
      const tagResponse = await postTag(
        {
          file_id: response.file_id,
          tag: appIdentifier,
        },
        userToken
      );
      Alert.alert(
        'Upload',
        'File uploaded',
        [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(update + 1);
              doReset();
              navigation.navigate('Home');
            },
          },
        ],
        {cancelable: false}
      );
    } catch (e) {
      Alert.alert('Upload', 'Failed');
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Sorry, we need camera roll and camera permissions to make this work'
          );
        }
      }
    })();
  }, []);

  const pickImage = async (library) => {
    let result = null;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };
    if (library) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      result = await ImagePicker.launchCameraAsync(options);
    }
    if (!result.cancelled) {
      setFiletype(result.type);
      setImage(result.uri);
    }
  };

  const doReset = () => {
    setImage(null);
    reset();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" enabled>
        <Card>
          <Text h4>Upload media file</Text>
          {image && <Image source={{uri: image}} style={styles.img} />}
          <Input
            placeholder="title"
            value={inputs.title}
            onChangeText={(txt) => handleInputChange('title', txt)}
            errorMessage={uploadErrors.title}
          />
          <Input
            placeholder="description"
            value={inputs.description}
            onChangeText={(txt) => handleInputChange('description', txt)}
            errorMessage={uploadErrors.description}
          />
          <Button
            title="Choose image from library"
            onPress={() => pickImage(true)}
          />
          <Button title="Use camera" onPress={() => pickImage(false)} />
          {isUploading && <ActivityIndicator size="large" color="#0000ff" />}
          <Button
            title="Upload file"
            onPress={doUpload}
            disabled={
              uploadErrors.title !== null ||
              uploadErrors.description !== null ||
              image === null
            }
          />
          <Button title="Reset" onPress={doReset} />
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default Upload;
