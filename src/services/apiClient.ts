import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDAwNzk5YTgxZGEwMmQ2ZGU2MTcwNmQzNzNiMmE5MCIsIm5iZiI6MTc0NDkwOTMxMy41MzksInN1YiI6IjY4MDEzNDAxZTUwNmE4ZTNhMGFkMDQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EIZQ6UXVtygsWYzautdv9kaOCCdQLZeabJ6DyzcGEn8',
        'Accept': 'application/json'
    }
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API call error: ', error);
        return Promise.reject(error);
    }
);

export default apiClient;