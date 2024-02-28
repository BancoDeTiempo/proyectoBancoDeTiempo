import Swal from 'sweetalert2/dist/sweetalert2.all.js';

export const useRegisterError = (res, setRegisterOk, setRes) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    console.log('entra en el IF');
    const dataToString = JSON.stringify(res);
    localStorage.setItem('data', dataToString);
    setRegisterOk(() => true);

    Swal.fire({
      icon: 'success',
      title: 'Welcome to our Page',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! ------------------- 409: user ya registrado

  if (res?.response?.status === 409) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'The email is already registered',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! ------------------- Formato de contraseña incorrecto

  if (res?.response?.data?.includes('Validation failed: password')) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Min 8 characters, 1 upper case, 1 lower case and a special character',
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  //! ------------------- userName existente

  if (
    res?.response?.data?.includes(
      'duplicate key error collection: userProyect.users index: name_1 dup key: {name}',
    )
  ) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Name already taken. Try another one',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! ------------------- 500: internal server error

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Internal server error. Please try again.',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! ------------------- 404: Error, resend confirmation code

  if (
    res?.response?.status == 404 &&
    res?.response?.data?.confirmationCode?.includes('error, resend code')
  ) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Register OK. Error to resend code',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
};
