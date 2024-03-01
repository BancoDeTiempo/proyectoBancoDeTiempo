import { Swal } from 'sweetalert2/dist/sweetalert2.all.js';

export const useForgotPasswordError = (res, setRes, setForgotOk) => {
  // --------- 404: User not registered
  if (res?.response?.status == 404 && res?.response?.data?.includes('User no register')) {
    setRes(() => ({}));
    Swal.fire({
      icon: 'Error',
      title: 'NOPE!',
      text: 'Enter a valid email address',
      showConfirmButton: false,
      timer: 3000,
    });
  }
  // --------- 404: "dont send email and dont update user"
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes('dont send email and dont update user')
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Password update fail. Please, try again',
      showConfirmButton: false,
      timer: 3000,
    });
  }
  // --------- 200: updateUser: true / sendPassword: true
  if (res?.status == 200) {
    if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
      setForgotOk(() => true);
      setRes(() => ({}));
      Swal.fire({
        icon: 'SUCCESS',
        title: 'Password updated',
        text: 'Sent email with new password',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
  // --------- 404: updateUser: false / sendPassword: true
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.sendPassword == true &&
    res?.response?.data?.updateUser == false
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: 'Error',
      title: 'NOPE!',
      text: 'Password update fail. Invalid email',
      showConfirmButton: false,
      timer: 3000,
    });
  }
  // --------- 500: interval server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: 'Error',
      title: 'NOPE!',
      text: 'Internal server error. Please, try again',
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
