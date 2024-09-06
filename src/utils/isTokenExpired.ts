import { jwtDecode } from 'jwt-decode';

export default function isTokenExpired(token: string | null) {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (!decodedToken.exp) {
      console.warn('Token does not have an expiration date.');
      return true;
    }
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
}
