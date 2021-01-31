import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

// general function for fetching (fetchOptions default value is an empty object)
const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    throw new Error('doFetch failed :p');
  } else {
    return json;
  }
};

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async (limit = 3) => {
    try {
      const listJson = await doFetch(baseUrl + 'media?limit=' + limit);
      const media = await Promise.all(
        listJson.map(async (item) => {
          const fileJson = await doFetch(baseUrl + 'media/' + item.file_id);
          // console.log('results', fileJson);
          return fileJson;
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.error('loadMedia error', error);
    }
  };

  useEffect(() => {
    loadMedia(5);
  }, []);

  return mediaArray;
};

const useLogin = () => {
  const postLogin = async (userCrentials) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCrentials),
    };
    try {
      const userData = await doFetch(baseUrl + 'login', options);
      return userData;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  return {postLogin};
};

const useUser = () => {
  const postRegister = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const json = await doFetch(baseUrl + 'users', fetchOptions);
      return json;
    } catch (e) {
      console.log('ApiHooks register', e.message);
      return new Error(e.message);
    }
  };
  const checkToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const userData = await doFetch(baseUrl + 'users/user', options);
      return userData;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const checkUserId = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (err) {
      throw new Error('Error from checkUserId', err.message);
    }
  };

  return {postRegister, checkToken, checkUserId};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const tagList = await doFetch(baseUrl + 'tags/' + tag);
      return tagList;
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return {getFilesByTag};
};
export {useLoadMedia, useLogin, useUser, useTag};
