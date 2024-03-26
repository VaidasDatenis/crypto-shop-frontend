import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { GroupService } from "../../services/groups.service";
import { merge } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  selector: 'my-groups-container',
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './my-groups-container.component.html',
  styleUrl: './my-groups-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyGroupsContainerComponent {
  isFormOpen = signal<boolean>(false);
  groupService = inject(GroupService);

  groupForm: FormGroup = new FormGroup({
      groupName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(''),
      isPublic: new FormControl(null, [Validators.required, Validators.nullValidator]),
      groupImage: new FormControl('', Validators.required),
    });
  errorMessage = '';

  constructor() {
    merge(this.groupForm.statusChanges, this.groupForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onSubmit(): void {
    console.log(this.groupForm.value);
    // if (this.groupForm.valid) {
    //   this.groupService.createGroup(this.groupForm.value);
    // };
  }

  onOpenForm() {
    this.isFormOpen.update(() => true);
  }

  onCancelForm() {
    this.groupForm.reset();
    this.isFormOpen.update(() => false);
  }

  updateErrorMessage() {
    if (this.groupForm.controls['groupName'].hasError('required')) {
      this.errorMessage = 'You must give Your group a name.';
    } else if (this.groupForm.controls['groupName'].hasError('maxLength')) {
      this.errorMessage = 'Name cannot be longer than 50 characters.';
    } else {
      this.errorMessage = '';
    }
     if (this.groupForm.controls['isPublic'].hasError('required')) {
      this.errorMessage = 'You must select a group type.';
    } else {
      this.errorMessage = '';
    }
    if (this.groupForm.controls['groupImage'].hasError('required')) {
      this.errorMessage = 'You must upload a representative group image.';
    } else {
      this.errorMessage = '';
    }
  }
}
