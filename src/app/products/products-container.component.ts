import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from "@angular/core";
import { ItemComponent } from "./items/item.component";
import { RequestsService } from "../services/requests.service";
import { Product } from "../iterfaces/product.interface";
import { BehaviorSubject } from "rxjs";

@Component({
  standalone: true,
  selector: 'products-container',
  imports: [ItemComponent],
  templateUrl: './products-container.component.html',
  styleUrl: './products-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsContainerComponent implements OnInit {
  requestService = inject(RequestsService);

  listOfProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.getListOfProducts();
  }

  getListOfProducts() {
    this.requestService.getAllProducts().subscribe(
      (products) => this.listOfProducts.set(products)
    );
  }
}
