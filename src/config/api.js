// Configuración de la API
// Cambia esta URL según tu configuración del servidor
// Para desarrollo local con XAMPP/WAMP: http://localhost/proyecto_final/php
// Para producción: ajusta según tu dominio

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/proyecto_final/php';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login.php`,
  REGISTER: `${API_BASE_URL}/registro.php`,
  LOGOUT: `${API_BASE_URL}/logout.php`,
  DASHBOARD: `${API_BASE_URL}/dashboard.php`
};

export default API_BASE_URL;

