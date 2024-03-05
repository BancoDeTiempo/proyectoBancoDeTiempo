import Swal from 'sweetalert2/dist/sweetalert2.all';

export const useRequestError = (res, setRes, setOkRequest) => {
  //200
  if (res?.status == 200) {
    setOkRequest(() => true);

    Swal.fire({
      icon: 'success',
      title: 'Request created',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  // 404
  if (res?.response?.data?.includes('no he actualizado na de na')) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Service requested not found',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  if (
    res?.response?.data?.includes(
      'catch error en actualizar el user en la clave pendingRequestedService',
    )
  ) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Request update fail in your profile',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  if (
    res?.response?.data?.includes(
      'catch error en actualizar el user en la clave pendingRequestMyService ',
    )
  ) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Request update fail in the offerer user',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  if (res?.response?.data?.includes('no puedes hacerte a ti mismo una request')) {
    Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'You can not request something to yourself',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

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
};
