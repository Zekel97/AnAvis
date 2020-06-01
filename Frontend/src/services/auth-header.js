import AuthService from "../services/auth.service";

export default function authHeader() {

      const token = AuthService.getCurrentToken();
      return { 'x-access-token': token };

  }