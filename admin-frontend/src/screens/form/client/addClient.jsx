import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export const addClient = async (values) => {

    try {
        const response = await axios.post(
            'http://localhost:8080/add-client', values
        )
        console.log(response.status);
        if (response.status === 200) {
            console.log(response.status);
            MySwal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Client Added',
                time: 4000
            })
        } else if (response.status === 201) {
            MySwal.fire({
                icon: 'info',
                title: 'Oops..',
                text: 'Client Already Exist',
                time: 4000
            })
        }
    } catch (error) {
        console.log(error);
        MySwal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Something Went Wrong',
            time: 4000
        })
    }
}