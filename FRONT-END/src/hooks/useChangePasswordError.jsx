import Swal from 'sweetalert2/dist/sweetalert2.all.js';

export const useChangePasswordError = (res, setRes, setUser) => {
  console.log('Entra al custom hook');

  // 200: updateUser: true
  if (res?.data?.updateUser?.toString() == 'true') {
    setUser(() => null);
    localStorage.removeItem('user');
    setRes(() => ({}));
    Swal.fire({
      icon: 'success',
      title: 'Password changed!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // 200: updateUser: false
  if (res?.data?.updateUser?.toString() == 'false') {
    setRes(() => ({}));
    Swal.fire({
      icon: 'error',
      title: 'Interval server error',
      text: 'Please, try again',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // 404: password dont match
  if (res?.response?.data?.includes('password dont match')) {
    setRes(() => ({}));
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: "Current password don't match",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  // 404: general
  if (res?.response?.status == 404) {
    setRes(() => ({}));
    Swal.fire({
      icon: 'error',
      title: 'Interval server error',
      text: 'Please, try again',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //500: Interval server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Interval server error',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
