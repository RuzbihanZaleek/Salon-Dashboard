import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Toast } from '../../../components/Swal';

const MySwal = withReactContent(Swal);

export const updateReservation = async (newRow) => {
    var clientName = JSON.stringify(newRow.clientName);
    var service = JSON.stringify(newRow.service);
    var stylishName = JSON.stringify(newRow.stylishName);
    var date = JSON.stringify(newRow.date);
    var time = JSON.stringify(newRow.time);
    var status = JSON.stringify(newRow.status);

    if (date == "null" || time == "null") {
        MySwal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'All fields required',
            time: 3000
        })
    } else {
        try {
            const response = await axios.patch(
                `http://localhost:8080/update-reservation/${newRow._id}`, newRow
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


}