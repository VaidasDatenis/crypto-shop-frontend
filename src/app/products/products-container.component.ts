import { Component } from "@angular/core";
import { ItemComponent } from "./items/item.component";

@Component({
  standalone: true,
  selector: 'products-container',
  imports: [ItemComponent],
  templateUrl: './products-container.component.html',
  styleUrl: './products-container.component.scss'
})
export class ProductsContainerComponent {}
