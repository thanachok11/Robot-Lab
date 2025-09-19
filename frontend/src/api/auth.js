// สมมติว่าใช้ fetch API
const API_BASE_URL = 'https://robot-lab.onrender.com/api/auth';

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
};