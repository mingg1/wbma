import {useState} from 'react';

const useLogInForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (name, text) => {
    console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  return {
    handleInputChange,
    inputs,
  };
};

export default useLogInForm;
