import { Component, Inject, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogClose,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MetaMaskService } from "../services/meta-mask.service";
import { ErrorHandlerService } from "../services/error-handler.service";

@Component({
  selector: 'app-wallets-dialog',
  templateUrl: './wallets-dialog.component.html',
  styleUrl: './wallets-dialog.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class WalletsDialog {
  private metaMaskService = inject(MetaMaskService);
  private errorHandleService = inject(ErrorHandlerService);

  constructor(
    public dialogRef: MatDialogRef<WalletsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  connectMetaMaskWallet() {
    this.metaMaskService.connectMetaMaskWallet().subscribe({
      next: (accounts) => {
        // Proceed with any logic needed after successful connection
        this.onClose();
      },
      error: (error) => {
        this.errorHandleService.handleWalletError(error);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}