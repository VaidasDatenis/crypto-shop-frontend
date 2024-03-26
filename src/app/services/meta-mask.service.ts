import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import detectEthereumProvider from '@metamask/detect-provider';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { RequestsService } from './requests.service';
import { AuthService } from './auth.service';
import { ethers } from 'ethers';
import { networkMapUtil } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class MetaMaskService {
  private toastr = inject(ToastrService);
  private errorHandleService = inject(ErrorHandlerService);
  private requestsService = inject(RequestsService);
  private authService = inject(AuthService);

  private provider$: Observable<MetaMaskEthereumProvider | null>;

  constructor() {
    this.provider$ = from(detectEthereumProvider() as Promise<MetaMaskEthereumProvider | null>).pipe(
      tap(provider => {
        if (!provider) {
          this.toastr.warning('Please install MetaMask!', 'Warning');
        }
      }),
      shareReplay(1), // Ensures provider is only detected once
      catchError(error => {
        this.toastr.error('Error detecting MetaMask.', 'Error');
        return throwError(() => new Error('Ethereum provider not found.'));
      })
    );
  }

  init(): void {
    this.provider$.subscribe({
      next: (provider) => {
        if (provider) {
          this.checkInitialConnection();
          this.listenForAccountChanges();
          this.listenForChainChanges();
        }
      },
      error: (error) => console.error('Error initializing MetaMask service:', error)
    });
  }

  connectMetaMaskWallet(): Observable<{ access_token: string; userId: string; }> {
    this.authService.isLoading.next(true);
    return this.getProvider().pipe(
      switchMap(provider => {
        if (!provider) {
          this.authService.isLoading.next(false);
          return throwError(() => this.toastr.error('Please install MetaMask or another Ethereum wallet.', 'Wallet Not Found'));
        }
        // "provider.request" returns a Promise, so we use "from" to convert it to an Observable
        return this.makeProviderRequest<string[]>('eth_requestAccounts');
      }),
      switchMap((accounts: string[]) => {
        if (accounts.length === 0) {
          return throwError(() => this.toastr.error('No accounts found', 'No accounts found'));
        }
        this.authService.connectedAccountSignal.update(() => accounts[0]);
        this.getMetaMaskBalance(accounts[0]);
        const payload = { walletAddress: accounts[0] };
        return this.requestsService.connect(payload);
      }),
      tap((response: { access_token: string; userId: string }) => {
        this.authService.isLoading.next(false);
        this.authService.setUserId(response.userId);
        this.authService.setToken(response.access_token);
        this.authService.isConnectedSubject.next(true);
        this.toastr.success('Wallet connected successfully.', 'Success');
      }),
      catchError(error => {
        return throwError(() => this.errorHandleService.handleWalletError(error));
      })
    );
  }

  getMetaMaskNetwork(): Observable<string> {
    return this.makeProviderRequest<string>('net_version').pipe(
      map((networkId) => {
        this.authService.accountNetworkSignal.update(() => networkMapUtil[networkId]);
        return networkMapUtil[networkId] || `Unknown ${networkId})`;
      })
    );
  }

  getMetaMaskBalance(account: string): Observable<string> {
    return this.makeProviderRequest<string>('eth_getBalance', [account, 'latest']).pipe(
      map(balanceWei => ethers.formatEther(balanceWei)),
      tap(balance => this.authService.accountBalanceSignal.update(() => balance)),
      catchError(() => {
        this.toastr.error('Failed to get account balance.', 'Error');
        return throwError(() => new Error('Failed to get account balance.'));
      })
    );
  }

  private checkInitialConnection(): void {
    this.makeProviderRequest<string[]>('eth_accounts').subscribe({
      next: accounts => {
        if (accounts.length > 0) {
          this.handleAccountChange(accounts[0]);
        } else {
          this.authService.disconnect();
        }
      },
      error: error => this.errorHandleService.handleWalletError(error)
    });
  }

  private handleAccountChange(account: string): void {
    this.authService.isConnectedSubject.next(true);
    this.authService.connectedAccountSignal.update(() => account);
    this.getMetaMaskBalance(account).subscribe();
    this.getMetaMaskNetwork().subscribe();
  }

  private listenForAccountChanges(): void {
    this.getProvider().subscribe((provider: any) => {
      provider.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          this.handleAccountChange(accounts[0]);
        } else {
          this.authService.disconnect();
          this.toastr.success('Disconnected successfully.', 'Success');
        }
      });
    });
  }

  private listenForChainChanges(): void {
    this.getProvider().subscribe((provider: any) => {
      if (!provider) return;
      provider.on('chainChanged', (chainId: string) => {
        this.handleChainChange(chainId);
      });
    });
  }

  private handleChainChange(chainId: string): void {
    // Convert chainId to a decimal number
    const networkId = parseInt(chainId, 16).toString();
    // Update the network information in the AuthService or trigger a refresh
    this.getMetaMaskNetwork().subscribe(networkName => {
      this.authService.accountNetworkSignal.update(() => networkName);
      // Optionally, refresh data or update the UI as needed
      this.toastr.info(`Network changed to: ${networkName}`, 'Network Changed');
    });
  }

  private getProvider(): Observable<MetaMaskEthereumProvider> {
    return this.provider$.pipe(
      switchMap(provider => provider ? of(provider) : throwError(() => new Error('Provider not available')))
    );
  }

  private makeProviderRequest<T>(method: string, params: string[] = []): Observable<T> {
    return this.getProvider().pipe(
      switchMap(provider => {
        if (!provider) {
          this.toastr.error('Please install MetaMask!', 'Error');
          return throwError(() => new Error('Ethereum provider not found.'));
        }
        return from(provider.request({ method, params }) as Promise<T>);
      }),
      catchError(error => {
        // Handle errors or rethrow them
        console.error(`Error during ${method} request:`, error);
        return throwError(() => new Error(`Error during ${method} request`));
      })
    );
  }
}
