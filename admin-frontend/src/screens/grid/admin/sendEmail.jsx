import axios from 'axios';
import Swal from 'sweetalert2'
import { Toast } from '../../../components/Swal';


export const sendEmail = async (values) => {

    try {
        const response = await axios.post(
            "http://localhost:8080/adminEmail", values
        )
        if (response.status === 200) {
            //handleSuccess();
            console.log("Email sent successfully");

            const toast = Toast;
            toast.fire({
                icon: 'success',
                title: 'Email Sent!'
            })
        }
    } catch (error) {
        console.log(error)
    }
}