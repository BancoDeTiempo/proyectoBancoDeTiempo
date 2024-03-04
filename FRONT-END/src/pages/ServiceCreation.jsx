import { useAuth } from '../contexts/authContext';
import { useForm } from 'react-hook-form';
import './Register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createService } from '../services/Servicio.service';
import { useServiceError } from '../hooks/useServiceError';
import { Uploadfile } from '../components';
//import { tagEnum } from '../utils';
export const NewService = () => {
  const navigate = useNavigate();
  const { allUser, setAllUser, bridgeData, setDeleteUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okNewService, setOkNewService] = useState(false);

  // FUNCIÓN ENCARGADA DEL FORM DATA

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;

    if (inputFile.length != 0) {
      const customFormData = {
        ...formData,
        image: inputFile[0],
      };

      setSend(true);
      setRes(await createService(customFormData));
      setSend(false);
    } else {
      const customFormData = {
        ...formData,
      };

      setSend(true);
      setRes(await createService(customFormData));
      setSend(false);
    }
  };

  // useRegisterError y seteo de Registro

  useEffect(() => {
    console.log(res);
    useServiceError(res, setOkNewService, setRes);
    if (res?.status == 200) bridgeData('ALLUSER');
  }, [res]);

  useEffect(() => {
    console.log('tenemos allUser', allUser);
  }, [allUser]);

  useEffect(() => {
    setDeleteUser(() => false);
  }, []);

  // ESTADOS DE NAVEGACIÓN

  if (okNewService) {
    return <Navigate to="/ServiceGallery" />;
  }

  return (
    <>
      <div className="form-wrap">
        <h1>¿Qué servcio quieres Ofrecer?</h1>
        <p>
          Crea tu nuevo servicio para poder ofrecerlo, y que el resto de miembros de nuestra comunidad pueda solicitarlo
        </p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              //placeholder='Paseo Perros'
              type="text"
              id="title"
              name="title"
              autoComplete="false"
              {...register('title', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Título del Servicio
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              //placeholder='Certificado adiestrador, paseo tu/s perro/s durante 30 min.'
              type="text"
              id="description"
              name="descrption"
              autoComplete="false"
              {...register('description', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Descripción del servicio
            </label>
          </div>

          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="tag"
              name="tag"
              autoComplete="false"
              {...register('tag', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Categoría
            </label>
          </div>
          <Uploadfile />

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#5500c4' : '#631ebe' }}
            >
              Crea el servicio
            </button>
          </div>
          <p className="bottom-text">
            <small>
              Al subir el nuevo servicio aceptas nuestros {''}
              <Link className="anchorCustom">Términos y Condiciones</Link> y {''}
              <Link className="anchorCustom">Política de Privacidad</Link>
            </small>
          </p>
        </form>
      </div>
    </>
  );
};
