import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: 'group-item',
  imports: [],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupItemComponent {}
