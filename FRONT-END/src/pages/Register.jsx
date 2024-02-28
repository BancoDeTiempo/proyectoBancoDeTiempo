import { useAuth } from '../contexts/authContext';
import { useForm } from 'react-hook-form';
import './Register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { registerUser } from '../services/User.service';
import { useRegisterError } from '../hooks/useRegisterError';
import { Uploadfile } from '../components';

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

  // useRegisterError y seteo de Registro

  useEffect(() => {
    console.log(res);
    useRegisterError(res, setOkRegister, setRes);
    if (res?.status == 200) bridgeData('ALLUSER');
  }, [res]);

  useEffect(() => {
    console.log('tenemos allUser', allUser);
  }, [allUser]);

  useEffect(() => {
    setDeleteUser(() => false);
  }, []);

  // ESTADOS DE NAVEGACIÓN

  if (okRegister) {
    return <Navigate to="/verifyCode" />;
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Sing Up</h1>
        <p>Its free but it will take you a lifetime to do it</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register('name', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Name
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="userName"
              name="userName"
              autoComplete="false"
              {...register('userName', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Username
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              type="number"
              id="dateOfBirth"
              name="dateOfBirth"
              autoComplete="false"
              {...register('dateOfBirth', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Date of Birth
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="address"
              name="address"
              autoComplete="false"
              {...register('address', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Address
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              type="number"
              id="postalCode"
              name="postalCode"
              autoComplete="false"
              {...register('postalCode', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Postal Code
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="city"
              name="city"
              autoComplete="false"
              {...register('city', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              City
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              type="number"
              id="phone"
              name="phone"
              autoComplete="false"
              {...register('phone', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Phone
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="description"
              name="description"
              autoComplete="false"
              {...register('description', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Describe yourself
            </label>
          </div>

          <div className="password_container form-group">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register('password', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Password
            </label>
          </div>

          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register('email', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>

            <div className="sexo">
              <input
                type="radio"
                name="sexo"
                id="hombre"
                value="hombre"
                {...register('gender')}
              />
              <label htmlFor="hombre" className="label-radio hombre">
                Hombre
              </label>
              <input
                type="radio"
                name="sexo"
                id="mujer"
                value="mujer"
                {...register('gender')}
              />
              <label htmlFor="mujer" className="label-radio mujer">
                Mujer
              </label>
            </div>
            <Uploadfile />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#49c1a388' : '#2f7a67' }}
            >
              Register
            </button>
          </div>
          <p className="bottom-text">
            <small>
              By clicking the Sing Up button, you agree to our{''}
              <Link className="anchorCustom">Terms & Conditions</Link> and {''}
              <Link className="anchorCustom">Privacy Policy</Link>
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </>
  );
};
