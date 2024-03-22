import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { Animations } from '../animations/animations';
import { WalletCardComponent } from '../wallet-card/wallet-card.component';
import { GroupsContainerComponent } from '../groups/groups-container.component';
import { ProductsContainerComponent } from '../products/products-container.component';
import { MetaMaskService } from '../services/meta-mask.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NavigationBarComponent, WalletCardComponent, GroupsContainerComponent, ProductsContainerComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  animations: [Animations.connectNotification],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  metemaskService = inject(MetaMaskService);

  ngOnInit(): void {
    this.metemaskService.init();
  }
}
