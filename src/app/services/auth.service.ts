import { Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId = signal<string | null>(null);
  connectedAccountSignal = signal<string | null>(null);
  connectedAccount$ = toObservable(this.connectedAccountSignal);

  accountBalanceSignal = signal<string | null>(null);
  accountBalance$ = toObservable(this.accountBalanceSignal);

  accountNetworkSignal = signal<string | null>(null);
  accountNetwork$ = toObservable(this.accountNetworkSignal);

  isConnectedSubject = new BehaviorSubject<boolean>(false);
  isConnected = toSignal(this.isConnectedSubject);

  isLoading = new BehaviorSubject<boolean>(false);
  isLoadingSignal = toSignal(this.isLoading);

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setUserId(userId: string) {
    this.userId.update(() => userId);
  }

  setToken(token: string ): void {
    localStorage.setItem('access_token', token);
  }

  clearToken(): void {
    localStorage.removeItem('access_token');
  }

  clearUswerId() : void {
    this.userId.update(() => null);
  }

  disconnect() {
    this.clearToken();
    this.clearUswerId();
    this.connectedAccountSignal.update(() => null);
    this.isConnectedSubject.next(false);
  }
}
