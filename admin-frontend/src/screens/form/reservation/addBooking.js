import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SwtAlert } from '../../../components/Swal';

const MySwal = withReactContent(Swal);

export const addBooking = async (values) => {
    values.date = new Date(values.date).toLocaleDateString('fr-BE');
    values.time = new Date(values.time).toLocaleTimeString();
    //console.log(values.time);
    try {
        const response = await axios.post(
            "http://localhost:8080/add-reservation", values
        )

        if (response.status === 200) {
            console.log("Booking Added Successfully");
            SwtAlert('success', 'Success!', 'Reservation Successful!', 4000)
        } else if (response.status === 201) {
            SwtAlert('info', 'Oops..', 'Stylish is not available at this time slot!', 4000)
        }
    } catch (error) {
        console.log(error)
        SwtAlert('error', 'Error!', 'Something Went Wrong', 4000)
    }
}