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
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  constructor(public dataService: DataService) {}

  onImportImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const imageUrl = URL.createObjectURL(input.files[0]);
    this.dataService.isImage = true;
    console.log(
      'currentDocId: ',
      this.dataService.currentDocId,
      'currentPageId: ',
      this.dataService.currentPageId,
    );

    const imageKey = this.dataService.getAnnId();
    console.log('imageKey: ', imageKey);
  }

  onTextEnter(event: Event) {
    const inputText = (event.target as HTMLInputElement).value;
    const textKey = this.dataService.getAnnId();
    this.dataService.isText = true;
  }

  onCancel() {
    this.dataService.isImage = false;
    this.dataService.isText = false;
    this.dataService.currentPageId = null;
  }
}
