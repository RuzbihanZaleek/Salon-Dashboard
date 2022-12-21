import axios from 'axios';
import Swal from 'sweetalert2'
import { Toast } from '../../../components/Swal';

export const updateStylish = async (newRow) => {

    try {
        const response = await axios.patch(
            `http://localhost:8080/update-stylish/${newRow._id}`, newRow
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