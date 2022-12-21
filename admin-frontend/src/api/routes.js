import axios from 'axios';
const path = "http://localhost:8080";

//Signin
export const signin = async (values) => {
    console.log(values);
    const res = await axios.post(`http://localhost:8080/signup`, values)
    return res;
}