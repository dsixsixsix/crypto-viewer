import axios from 'axios';

// Создаем экземпляр axios с базовыми настройками для CryptoCompare
const api = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': 'Apikey 64da8895c1a77f050b3a5a01a4c52a883d81e6472bd6efc67b7bace55eea0214'
  }
});

// Добавляем перехватчик для обработки ошибок
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Ошибка от сервера
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Ошибка запроса
      console.error('Request Error:', error.request);
      return Promise.reject({ message: 'Network error occurred' });
    } else {
      // Ошибка настройки запроса
      console.error('Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default api; 