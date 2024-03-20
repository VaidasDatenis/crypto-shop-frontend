import { Component } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { Animations } from '../animations/animations';
import { WalletCardComponent } from '../wallet-card/wallet-card.component';
import { GroupsContainerComponent } from '../groups/groups-container.component';
import { ProductsContainerComponent } from '../products/products-container.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NavigationBarComponent, WalletCardComponent, GroupsContainerComponent, ProductsContainerComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  animations: [Animations.connectNotification]
})
export class ContentComponent {

}
