import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { WalletsDialog } from '../wallets-dialog/wallets-dialog.component';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MetaMaskService } from '../services/meta-mask.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'navigation-bar',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
  public walletDialog = inject(MatDialog);
  private toastr = inject(ToastrService);
  public authService = inject(AuthService);
  public metamaskService = inject(MetaMaskService);

  openConnectDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.walletDialog.open(WalletsDialog, {
      width: '31.25rem',
      enterAnimationDuration,
      exitAnimationDuration,
      hasBackdrop: true,
      data: {}
    });
  }

  disconnect(): void {
    this.authService.clearToken();
    this.toastr.success('Wallet disconnected successfully.', 'Success');
  }
}
