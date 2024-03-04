import Swal from 'sweetalert2/dist/sweetalert2.all.js';

export const useServiceError = (res, setServiceOk, setRes) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    console.log('entra en el IF');
    const dataToString = JSON.stringify(res);
    localStorage.setItem('data', dataToString);
    setServiceOk(() => true);

    Swal.fire({
      icon: 'success',
      title: '¡Tu servicio ha sido creado!',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! ------------------- 404: Error al crear el servicio

  if (res?.response?.status === 404) {
    Swal.fire({
      icon: 'error',
      title: '¡Ohh!',
      text: 'No hemos podido crear tu servicio',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
}