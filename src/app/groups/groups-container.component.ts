import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GroupItemComponent } from "./group/group-item.component";

@Component({
  selector: 'groups-content',
  standalone: true,
  imports: [GroupItemComponent],
  templateUrl: './groups-container.component.html',
  styleUrl: './groups-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsContainerComponent {}
