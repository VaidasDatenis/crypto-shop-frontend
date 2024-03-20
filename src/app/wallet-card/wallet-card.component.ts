import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'wallet-card',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.scss'
})
export class WalletCardComponent {

}
