import instance from "../axios";

export const login = (username, password) => {
    return instance.post('/users/login.php', {
        username,
        password
    });
}

export const register = (username, email, password) => {
    return instance.post('/users/register.php', {
        username,
        email,
        password
    });
}

