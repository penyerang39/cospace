import { AbstractAuthProvider } from 'tinacms';

export class SimpleAuthProvider extends AbstractAuthProvider {
  async authenticate() {
    const token = prompt('Enter admin token:');
    if (token) {
      localStorage.setItem('tina-token', token);
      window.location.reload();
    }
  }

  async getToken() {
    const token = localStorage.getItem('tina-token');
    return { id_token: token || '' };
  }

  async getUser() {
    return !!localStorage.getItem('tina-token');
  }

  async logout() {
    localStorage.removeItem('tina-token');
    window.location.reload();
  }
}

