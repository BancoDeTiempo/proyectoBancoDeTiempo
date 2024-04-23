import './Request.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts';
import { useEffect, useState } from 'react';
import { create, getByIdService } from '../services';
import { useRequestError } from '../hooks';

export const Request = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(false);
  const [okRequest, setOkRequest] = useState(false);
  const [res, setRes] = useState({});
  //   const [selectedServiceId, setSelectedServiceId] = useState(null); // Estado para almacenar el serviceId seleccionado

  const formSubmit = async (formData) => {
    // primero necesitaría un serviceId
    const selectedService = document.getByIdService('serviceId');

    if (selectedService) {
      // custom form segun lo que me pedirá el back
      const customFormData = {
        ...formData,
        service: selectedService,
        requestUser: user,
      };

      setSend(true);
      setRes(await create(customFormData));
      setSend(false);
    }
  };

  useEffect(() => {
    useRequestError(res, setRes, setOkRequest);
  }, [res]);

  return (
    <>
      <div className="form-wrap">
        <h2>Make a request</h2>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="message"
              name="message"
              autoComplete="false"
              {...register('message', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Request message
            </label>
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? '#7e38d3' : '#7e38d3' }}
              >
                Send request
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

//     setSend(true); // Indica que se está enviando la solicitud

//     try {
//       // Incluye el serviceId en los datos de la solicitud
//       formData.serviceId = selectedServiceId;

//       const response = await axios.post(`/request/`, formData);
//       setRes(response);
//       setOkRequest(true); // Indica que la solicitud fue exitosa
//     } catch (error) {
//       setRes(error.response); // Captura el error en caso de que falle la solicitud
//       setOkRequest(false);
//     }

//     setSend(false); // La solicitud ha finalizado, restablece el estado de envío
//   };

//   const handleServiceClick = (serviceId) => {
//     // Manejar el clic en el servicio para seleccionarlo
//     setSelectedServiceId(serviceId);
//   };

//   const onSubmit = (data) => {
//     // Agregar el userId al formulario de datos antes de enviar
//     data.userId = user.id; // Suponiendo que tengas un campo 'id' en el objeto de usuario
//     createRequest(data);
//   };

//   return (
//     <div>
//       <h2>Crear Solicitud</h2>
//       {/* Renderizar los servicios disponibles */}
//       <div>
//         <h3>Servicios Disponibles</h3>
//         <ul>
//           <li onClick={() => handleServiceClick('serviceId1')}>Servicio 1</li>
//           <li onClick={() => handleServiceClick('serviceId2')}>Servicio 2</li>
//           {/* Agrega más servicios según sea necesario */}
//         </ul>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Título:</label>
//           <input type="text" {...register('title', { required: true })} required />
//         </div>
//         <div>
//           <label>Descripción:</label>
//           <textarea {...register('description', { required: true })} required />
//         </div>
//         <button type="submit" disabled={send}>
//           {send ? 'Enviando...' : 'Crear Solicitud'}
//         </button>
//       </form>
//     </div>
//   );
