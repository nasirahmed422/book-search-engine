// Decode a token and get the user's info
import decode from 'jwt-decode';

class AuthService {
  // Gets user data
  getProfile() {
    return decode(this.getToken());
  }

  // Verify if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Verify if token expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Get user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Save to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();