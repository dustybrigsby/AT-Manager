import decode from 'jwt-decode';

class AuthService {
  getUser() {
    try {
      const token = this.getToken();
      if (token) {
        return decode(token);
      } else {
        console.error({ message: "No token found - getUser" });
      }
    } catch (error) {
      console.error({ message: "Error decoding token - getUser", error });
    }

  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    try {
      if (token) {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          localStorage.removeItem('id_token');
          return true;
        }
        return false;
      } else {
        console.error({ message: "No token found - isTokenExpired" });
      }
    } catch (error) {
      console.error({ message: "Error decoding token - isTokenExpired" });
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    try {
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
    } catch (error) {
      console.error({ message: "Error setting token to localStorage - login" });
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('http://localhost:3000/login');
  }
}

const AuthorizationService = new AuthService();

export default AuthorizationService;
