import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import detectEthereumProvider from '@metamask/detect-provider';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { RequestsService } from './requests.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MetaMaskService {
  private toastr = inject(ToastrService);
  private errorHandleService = inject(ErrorHandlerService);
  private requestsService = inject(RequestsService);
  private authService = inject(AuthService);

  ethereumProvider = detectEthereumProvider() as Promise<MetaMaskEthereumProvider | null>;

  constructor() {
    this.init();
  }

  async init() {
    const provider = await this.ethereumProvider;
    if (provider) {
      if (provider !== window.ethereum) {
        console.log('Multiple wallets detected. Using the detected provider.');
        this.toastr.warning('Multiple wallets detected.', 'Warrning');
      }
      this.checkInitialConnection(provider);
      this.listenForAccountChanges(provider);
    } else {
      console.log('Please install MetaMask!');
      this.toastr.warning('Please install MetaMask!', 'Warrning');
      this.authService.isConnectedSubject.next(false);
    }
  }

  connectMetaMaskWallet(): Observable<string> {
    this.authService.isLoading.next(true);
    return from(this.ethereumProvider).pipe(
      switchMap(provider => {
        if (!provider) {
          this.authService.isLoading.next(false);
          return throwError(() => this.toastr.error('Please install MetaMask or another Ethereum wallet.', 'Wallet Not Found'));
        }
        // "provider.request" returns a Promise, so we use "from" to convert it to an Observable
        return from(provider.request({ method: 'eth_requestAccounts' }));
      }),
      switchMap((accounts: string[]) => {
        if (accounts.length === 0) {
          return throwError(() => this.toastr.error('No accounts found', 'No accounts found'));
        }
        this.authService.connectedAccountSignal.update(() => accounts[0]);
        const payload = { walletAddress: accounts[0] };
        return this.requestsService.connect(payload);
      }),
      tap((response) => {
        this.authService.isLoading.next(false);
        this.authService.setToken(response);
        this.authService.isConnectedSubject.next(true);
        this.toastr.success('Wallet connected successfully.', 'Success');
      }),
      catchError(error => {
        return throwError(() => this.errorHandleService.handleWalletError(error));
      })
    );
  }

  private async checkInitialConnection(provider: any) {
    try {
      const accounts = await provider.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        this.authService.isConnectedSubject.next(true);
        this.authService.connectedAccountSignal.update(() => accounts[0]); // Update Signal with the connected account
      } else {
        this.authService.disconnect();
      }
    } catch (error) {
      this.errorHandleService.handleWalletError(error)
    }
  }

  private listenForAccountChanges(provider: any) {
    provider.on('accountsChanged', (accounts: string[]) => {
      this.authService.isLoading.next(true);
      if (accounts.length === 0) {
        this.authService.isLoading.next(false);
        this.authService.disconnect();
        this.toastr.success('Diconnected successfully.', 'Success');
      } else {
        this.authService.clearToken();
        this.toastr.success('Account changed.', 'Success');
        const payload = { walletAddress: accounts[0] };
        this.requestsService.connect(payload).subscribe(({
          next: (response) => {
            this.authService.isLoading.next(false);
            this.authService.setToken(response);
            this.authService.isConnectedSubject.next(true);
            this.authService.connectedAccountSignal.update(() => accounts[0]);
          },
          error: (error) => this.errorHandleService.handleWalletError(error),
        }));
      }
    });
  }
}
