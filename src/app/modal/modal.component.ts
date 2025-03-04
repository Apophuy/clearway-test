import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { DataService } from '../../services/data.service';
import { AnnotationItem } from '../../types';

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
    public dialogData: {
      docId: number;
      pageId: number;
      getAnnId: () => string;
      addItem: (item: AnnotationItem) => void;
    },
    // private dialogRef: MatDialogRef<ModalComponent>,
  ) {}

  onImportImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const imageUrl = URL.createObjectURL(input.files[0]);
    this.isImage = true;
    const imageKey = this.dialogData.getAnnId();
    const item: AnnotationItem = {
      itemId: imageKey,
      data: imageUrl,
      type: 'image',
      position: { x: 0, y: 0 },
    };
    if (imageKey) {
      this.dialogData.addItem(item);
    }
  }

  onTextEnter(event: Event) {
    const inputText = (event.target as HTMLInputElement).value;
    this.isText = true;
    const textKey = this.dialogData.getAnnId();
    const item: AnnotationItem = {
      itemId: textKey,
      data: inputText,
      type: 'text',
      position: { x: 0, y: 0 },
    };

    if (textKey) {
      this.dialogData.addItem(item);
    }
  }

  onCancel() {
    this.isImage = false;
    this.isText = false;
  }
}
