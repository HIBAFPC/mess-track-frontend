export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/',
    REFRESH: '/auth/token/refresh/',
    ME: '/auth/me/',
  },
  USERS: {
    LIST: '/users/',
    DETAIL: (id: string) => `/users/${id}/`,
  },
  MEALS: {
    LIST: '/meals/',
    DETAIL: (id: string) => `/meals/${id}/`,
  },
};
