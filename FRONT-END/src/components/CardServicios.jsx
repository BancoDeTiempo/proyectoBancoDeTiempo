export const CardServicios = ({ data }) => {
  //* CREAMOS UNA FUNCIÓN AUTOEJECUTADA EN LA QUE AL CAMBIAR EL ID DEL PADRE SE CAMBIE EL ID DEL STATE Y SE VUELVA A INICIAR

  return (
    <>
      <figure>
        {/**qué img? vamos a meter una por tipo de servicio o usamos la del perfil de la persona? queremos siquiera img? */}
        <h2>{data?.title}</h2>
        <h3>{data?.offerer.userName}</h3>
        <p>{data?.tag}</p>
        <p>{data?.description}</p>
        {/**TODAS ESTAS CLAVES SON LAS DEL MODELO DE SERVICIO QUE SON RELEVANTES PARA ESTO*/}
      </figure>
    </>
  );
};
