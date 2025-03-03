import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

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
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  imageFile: File | undefined;
  inputText = '';

  constructor() {}

  onImportImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    this.imageFile = input.files[0];
  }

  onTextEnter(event: Event) {
    this.inputText = (event.target as HTMLInputElement).value;
  }

  onCancel() {
    this.imageFile = undefined;
    this.inputText = '';
  }
}
