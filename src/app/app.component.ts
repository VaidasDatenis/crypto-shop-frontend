import { Component, inject } from '@angular/core';
import { MetaMaskService } from './services/meta-mask.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ErrorHandlerService } from './services/error-handler.service';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppComponent {
  private metaMaskService = inject(MetaMaskService);
  private errorHandleService = inject(ErrorHandlerService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  connectMetaMaskWallet() {
    this.metaMaskService.connectMetaMaskWallet().subscribe({
      next: (accounts) => {
        // Proceed with any logic needed after successful connection
      },
      error: (error) => {
        this.errorHandleService.handleWalletError(error);
      }
    });
  }

  disconnect(): void {
    this.authService.clearToken();
    this.toastr.success('Wallet disconnected successfully.', 'Success');
  }
}
