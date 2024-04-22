import './Gallery.css';

import { useEffect, useState } from 'react';

import { CardServicios } from './CardServicios';

import { getAll } from '../services/Servicio.service';

export const Gallery = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getAll();
      // const servs = res.data;
      // setData({ item: 'service', data: servs });
      res.status === 200 && setData(res.data);
    })();
  }, []);

  return (
    <>
      <div id="servicesGallery">
        {/* {data != null &&
          data?.data?.map((item) => <CardServicios data={item} key={item._id} />)} */}
        {data !== null && //todo EL PROBLEMA ERA SPLICE----> BUSCAR OTRA FORMA DE FILTRAR
          data.map((item) => <CardServicios data={item} key={item._id} />)}
      </div>
    </>
  );
};
