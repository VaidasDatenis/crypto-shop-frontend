import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: 'product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {
  @Input() itemTitle!: string;
  @Input() itemDescription!: string;
  @Input() itemImages!: string;
  @Input() itemPrice!: string;
  @Input() currency!: string;
  @Input() sellerId!: string;
}
