import { Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  connectedAccountSignal = signal<string | null>(null);
  connectedAccount$ = toObservable(this.connectedAccountSignal);

  isConnectedSubject = new BehaviorSubject<boolean>(false);
  isConnected = toSignal(this.isConnectedSubject);

  isLoading = new BehaviorSubject<boolean>(false);
  isLoadingSignal = toSignal(this.isLoading);

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setToken(token: { access_token: string }): void {
    localStorage.setItem('access_token', token.access_token);
  }

  clearToken(): void {
    localStorage.removeItem('access_token');
  }

  disconnect() {
    this.clearToken();
    this.connectedAccountSignal.update(() => null);
    this.isConnectedSubject.next(false);
  }
}
