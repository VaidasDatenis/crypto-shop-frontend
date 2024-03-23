import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from "@angular/core";
import { RequestsService } from "../../services/requests.service";
import { Product } from "../../iterfaces/product.interface";
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
  selector: 'all-products',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: 'all-products.component.html',
  styleUrl: 'all-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllProductsComponent implements OnInit {
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
