import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { deleteUser } from '../services';

export const useDeleteUser = (setUser, setDeleteUser) => {
  Swal.fire({
    title: 'Do you really want to delete your user?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'rgb(73, 193, 162)',
    cancelButtonColor: '#d33',
    confirmButtonText: 'YES',
  }).then(async (result) => {
    console.log('result', result);

    if (result.isConfirmed) {
      const res = await deleteUser();

      switch (res.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            title: 'User deleted',
            text: 'Hope to see you again',
            showConfirmButton: false,
            timer: 1500,
          });

          setUser(() => null);
          setDeleteUser(() => true);
          localStorage.removeItem('user');
          break;

        default:
          Swal.fire({
            icon: 'error',
            title: 'User not deleted',
            text: 'Try Again',
            showConfirmButton: false,
            timer: 1500,
          });
          break;
      }
    }
  });
};
