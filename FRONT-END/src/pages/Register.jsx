import { useAuth } from '../contexts/authContext';
import { useForm } from 'react-hook-form';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { registerUser } from '../services/User.service';

export const Register = () => {
  const navigate = useNavigate();
  const { allUser, setAllUser, bridgeData, setDeleteUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);

  // FUNCIÓN ENCARGADA DEL FORM DATA

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;

    if (inputFile.length != 0) {
      const customFormData = {
        ...formData,
        image: inputFile[0],
      };

      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);
    } else {
      const customFormData = {
        ...formData,
      };

      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);
    }
  };

  useEffect;

  return <div>Register</div>;
};
