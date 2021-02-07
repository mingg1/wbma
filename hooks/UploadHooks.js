import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  description: {
    presence: {
      message: 'cannot be empty',
    },
  },
  length: {
    minimum: 5,
    message: 'min length is 5 characters',
  },
};

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [uploadErrors, setUploadErrors] = useState({});

  const handleInputChange = (name, text) => {

    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  const error = validator(name, text, constraints)
  setUploadErrors((uploadErrors) => {
    return {
      ...uploadErrors,
      [name]: error,
    };
  });
};
const reset = ()=>{
  setInputs({
    title:'',
    description:''
  })
  setUploadErrors({})
}
  return {
    handleInputChange,
    inputs,
    uploadErrors,
    reset
  };
};

export default useUploadForm;
