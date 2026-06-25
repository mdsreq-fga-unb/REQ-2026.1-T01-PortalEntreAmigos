import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Adiciona o token JWT em cada requisição
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portal_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepta respostas (ex: se o token expirar, pode forçar o logout aqui)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se a API retornar 401 Unauthorized e não estivermos na rota de login
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      // Opcional: implementar refresh token aqui ou apenas limpar e deslogar
      localStorage.removeItem('portal_access_token');
      localStorage.removeItem('portal_refresh_token');
      localStorage.removeItem('portal_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
