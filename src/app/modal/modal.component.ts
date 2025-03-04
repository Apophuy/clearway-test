import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modal',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    TextFieldModule,
  ],
  providers: [DataService],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  isImage = false;
  isText = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { docId: number; pageId: number; getAnnId: () => string },
    private dialogRef: MatDialogRef<ModalComponent>,
  ) {}

  onImportImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const imageUrl = URL.createObjectURL(input.files[0]);
    this.isImage = true;
    const imageKey = this.dialogData.getAnnId();
  }

  onTextEnter(event: Event) {
    const inputText = (event.target as HTMLInputElement).value;
    const textKey = this.dialogData.getAnnId();
    this.isText = true;
  }

  onCancel() {
    this.isImage = false;
    this.isText = false;
  }
}
