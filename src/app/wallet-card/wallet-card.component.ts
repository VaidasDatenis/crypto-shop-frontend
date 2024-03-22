import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ShortenAddressPipe } from '../pipes/shorten-string.pipe';

@Component({
  selector: 'wallet-card',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTooltipModule, AsyncPipe, ShortenAddressPipe],
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletCardComponent {
  authService = inject(AuthService);
}
