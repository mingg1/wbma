import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl, appIdentifier} from '../utils/variables';

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

const useLoadMedia = (all = false, limit = 10) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  const loadMedia = async (limit = 3) => {
    try {
      let listJson;
      if (all) {
        listJson = await doFetch(baseUrl + 'media?limit=' + limit);
      } else {
        listJson = await doFetch(baseUrl + 'tags/' + appIdentifier);
      }
      const media = await Promise.all(
        listJson.map(async (item) => {
          const fileJson = await doFetch(baseUrl + 'media/' + item.file_id);
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
  }, [update]);

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
  const postTag = async (tag, token) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      body: JSON.stringify(tag),
    };
    try {
      const result = await doFetch(baseUrl + 'tags', options);
      return result;
    } catch (error) {
      throw new Error('postTag error: ' + error.message);
    }
  };
  return {getFilesByTag, postTag};
};

const useMedia = () => {
  const upload = async (fd, token) => {
    const options = {
      method: 'POST',
      headers: {'x-access-token': token},
      data: fd,
      url: baseUrl + 'media',
    };
    try {
      const response = await axios(options);
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return {upload};
};
export {useLoadMedia, useLogin, useUser, useTag, useMedia};
