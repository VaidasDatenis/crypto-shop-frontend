import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from "@angular/router";
import { AllProductsComponent } from "./all-products/all-products.component";
import { MyProductsComponent } from "./my-products/my-products.component";
import { AuthService } from "../services/auth.service";

@Component({
  standalone: true,
  selector: 'tabs-container',
  imports: [RouterModule, MatTabGroup, MatTabsModule, AllProductsComponent, MyProductsComponent],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsContainerComponent {
  authService = inject(AuthService);
}
