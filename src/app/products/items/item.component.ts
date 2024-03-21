import { Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: 'product-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() itemTitle!: string;
  @Input() itemDescription!: string;
  @Input() itemImages!: string;
  @Input() itemPrice!: string;
  @Input() currency!: string;
  @Input() sellerId!: string;
}
