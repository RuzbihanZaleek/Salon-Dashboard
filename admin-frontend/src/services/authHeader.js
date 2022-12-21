export default function authHeader() {
    const email = JSON.parse(localStorage.getItem('email'));

    if (email && email.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken }
    } else {
        return {};
    }
}