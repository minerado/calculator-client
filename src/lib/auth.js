export const getToken = () => localStorage.getItem('jwt') || ''
export const removeToken = () => localStorage.removeItem('jwt')
export const setToken = (token) => localStorage.setItem('jwt', token)
