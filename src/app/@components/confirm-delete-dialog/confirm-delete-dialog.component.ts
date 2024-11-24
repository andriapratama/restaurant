import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.scss',
})
export class ConfirmDeleteDialogComponent {
  @Input() isShowModal: boolean;
  @Output() onDelete = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  public delete() {
    this.onDelete.emit();
  }

  public cancel() {
    this.onCancel.emit();
  }
}
