import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setToken(token: { access_token: string }): void {
    localStorage.setItem('access_token', token.access_token);
  }

  clearToken(): void {
    localStorage.removeItem('access_token');
  }
}
