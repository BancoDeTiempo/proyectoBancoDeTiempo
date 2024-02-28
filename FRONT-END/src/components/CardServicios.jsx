import { useEffect, useState } from 'react';

import { getByIdService } from '../services/Servicio.service';

export const CardServicios = ({ id }) => {
  const [data, setData] = useState(null);
  //* CREAMOS UNA FUNCIÓN AUTOEJECUTADA EN LA QUE AL CAMBIAR EL ID DEL PADRE SE CAMBIE EL ID DEL STATE Y SE VUELVA A INICIAR
  useEffect(() => {
    (async () => {
      const res = await getByIdService(id);
      res.status === 200 && setData(res);
    })();
  }, []);

  return (
    <>
      {data !== null && (
        <figure>
          {/**qué img? vamos a meter una por tipo de servicio o usamos la del perfil de la persona? queremos siquiera img? */}
          <h2>{data?.data?.title}</h2>
          <h3>{data?.data?.offerer}</h3>
          <p>{data?.data?.tag}</p>
          <p>{data?.data?.description}</p>
          {/**TODAS ESTAS CLAVES SON LAS DEL MODELO DE SERVICIO QUE SON RELEVANTES PARA ESTO*/}
        </figure>
      )}
    </>
  );
};
