import Swal from 'sweetalert2/dist/sweetalert2.all';

export const useUpdateError = (res, setRes, setUser, logout) => {
  // 200
  let contador;
  if (res?.data) {
    contador = 0;
    res?.data?.testUpdate?.map((item) => {
      for (let clave in item) {
        // contamos los false de claves actualizadas
        if (item[clave] == false) {
          contador++;
        }
      }
    });
  }

  // si contador == 0 se ha actualizado todo. No hay ningún false
  if (contador == 0) {
    let check = '';

    res?.data?.testUpdate?.forEach((item) => {
      for (let clave in item) {
        if (item[clave] == true) {
          check += `-${clave}-`;
        }
      }
    });
    if (res?.status == 200) {
      logout();
      setRes(() => ({}));
      return Swal.fire({
        icon: 'success',
        title: 'Data Updated',
        text: `Update: ${check}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  // 404 --- 500
  if (contador != 0) {
    if (res?.status == 200) {
      setRes(() => ({}));
      return Swal.fire({
        icon: 'error',
        title: "Error updating user's data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  if (res?.response?.status == 500 || res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: 'error',
      title: 'NOPE!',
      text: 'Interval server error! Data update fail.',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
