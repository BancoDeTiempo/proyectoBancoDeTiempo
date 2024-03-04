import { useAuth } from '../contexts';
import { useForm } from 'react-hook-form';
import './FormUser.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { updateUser } from '../services';
import { useUpdateError } from '../hooks';
import { FigureUser, Uploadfile } from '../components';

export const FormUser = () => {
  const { user, setUser, logout } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  // copia de datos actuales para ponerlos por default
  const defaultData = {
    name: user?.user,
  };

  // funcion que gestiona el formulario

  const formSubmit = (formData) => {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to change your data?',
      showCancelButton: true,
      confirmButtonColor: 'rgb(73, 193, 162)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YES',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById('file-upload').files;

        if (inputFile.length != 0) {
          const customFormData = {
            ...formData,
            image: inputFile[0],
          };

          setSend(true);
          setRes(await updateUser(customFormData));
          setSend(false);
        } else {
          const customFormData = {
            ...formData,
          };
          setSend(true);
          setRes(await updateUser(customFormData));
          setSend(false);
        }
      }
    });
  };

  // useEffect que gestiona la respuesta con el custom hook

  useEffect(() => {
    console.log(res);
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);

  return (
    <>
      <div className="containerUser">
        <div className="containerDataNoChange">
          <FigureUser user={user} />
        </div>
        <div className="form-wrap formUser">
          <h1>Change your data</h1>
          <p>Enter your new data</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="userName"
                name="userName"
                autoComplete="false"
                defaultValue={defaultData?.userName}
                {...register('userName')}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                User Name
              </label>
            </div>
            <Uploadfile />
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? '#49c1a388' : '#49c1a2' }}
              >
                Change your data
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
