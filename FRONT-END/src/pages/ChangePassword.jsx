import { useEffect, useState } from 'react';
import { useAuth } from '../contexts';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import { changePasswordUserToken } from '../services';
import { useChangePasswordError } from '../hooks';

export const ChangePassword = () => {
  const { setUser } = useAuth;
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  // Función que gestiona el formulario

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData;

    if (newPassword == confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'You are about to change your password. Are you sure?',
        showCancelButton: true,
        confirmButtonColor: 'rgb(73, 193, 162)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yup',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setSend(true);
          setRes(await changePasswordUserToken({ password, newPassword }));
          setSend(false);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: "Passwords don't match",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  // Gestión de respuesta con useEffect y custom hook

  useEffect(() => {
    console.log(res);
    useChangePasswordError(res, setRes, setUser);
  }, [res]);

  return (
    <>
      <div className="form-wrap">
        <h1>Change your password</h1>
        <p>Enter your current password and the new one</p>
        <form onSubmit={handleSubmit(formSubmit)}>
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
              Current password
            </label>
          </div>
          <div className="newPassword_container form-group">
            <input
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              {...register('newPassword', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              New password
            </label>
          </div>
          <div className="confirmPassword_container form-group">
            <input
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="false"
              {...register('confirmPassword', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Confirm new password
            </label>
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#49c1a388' : '#49c1a2' }}
            >
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
