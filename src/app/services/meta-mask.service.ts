import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import detectEthereumProvider from '@metamask/detect-provider';
import { from, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MetaMaskService {
  private toastr = inject(ToastrService);
  private errorHandleService = inject(ErrorHandlerService);

  connectMetaMaskWallet() {
    return from(detectEthereumProvider() as Promise<MetaMaskEthereumProvider | null>).pipe(
      switchMap(provider => {
        if (!provider) {
          this.toastr.error('Please install MetaMask or another Ethereum wallet.', 'Wallet Not Found');
          return throwError(() => new Error('Wallet not found'));
        }
        // "provider.request" returns a Promise, so we use "from" to convert it to an Observable
        return from(provider.request({ method: 'eth_requestAccounts' }));
      }),
      tap(() => {
        this.toastr.success('Wallet connected successfully.', 'Success');
      }),
      catchError(error => {
        this.errorHandleService.handleWalletError(error);
        return throwError(() => error);
      })
    );
  }
}
