import axios from 'axios';
import Swal from 'sweetalert2'
import { SwtAlert } from '../../../components/Swal';

export const deleteStylish = async (id) => {

    try {
        const response = await axios.delete(
            `http://localhost:8080/delete-stylish/${id}`
        )
        console.log(response.status);
        if (response.status === 200) {
            console.log(response.status);
            SwtAlert('success', 'Deleted!', 'Your record has been deleted.', 4000);
        }
    } catch (error) {
        console.log(error);
    }
}

