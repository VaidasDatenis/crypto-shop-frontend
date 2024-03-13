import { Component } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { Animations } from '../animations/animations';
import { WalletCardComponent } from '../wallet-card/wallet-card.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NavigationBarComponent, WalletCardComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  animations: [Animations.connectNotification]
})
export class ContentComponent {

}
