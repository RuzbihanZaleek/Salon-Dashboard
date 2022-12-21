import axios from 'axios';
import Swal from 'sweetalert2'
import { Toast } from '../../../components/Swal';

export const updateClient = async (newRow) => {

    try {
        const response = await axios.patch(
            `http://localhost:8080/update-client/${newRow._id}`, newRow
        )
        console.log(response.status);
        if (response.status === 200) {
            console.log(response.status);

            const toast = Toast;
            toast.fire({
                icon: 'success',
                title: 'Updated successfully'
            })
        }
    } catch (error) {
        console.log(error);
    }
}