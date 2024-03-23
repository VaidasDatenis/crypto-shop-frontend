import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { Animations } from '../animations/animations';
import { WalletCardComponent } from '../wallet-card/wallet-card.component';
import { GroupsContainerComponent } from '../groups/groups-container.component';
import { TabsContainerComponent } from '../tabs-content/tabs-container.component';
import { MetaMaskService } from '../services/meta-mask.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NavigationBarComponent, WalletCardComponent, GroupsContainerComponent, TabsContainerComponent, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  animations: [Animations.connectNotification],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  metemaskService = inject(MetaMaskService);
  drawerIcon: string = 'chevron_left';

  ngOnInit(): void {
    this.metemaskService.init();
  }

  toggleDrawer(drawer: any): void {
    drawer.toggle();
    this.drawerIcon = drawer.opened ? 'chevron_left' : 'chevron_right';
  }
}
