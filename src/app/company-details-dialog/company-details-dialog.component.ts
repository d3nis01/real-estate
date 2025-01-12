import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ICompany } from '../models/company';

@Component({
  selector: 'app-company-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './company-details-dialog.component.html',
  styleUrls: ['./company-details-dialog.component.css'],
})
export class CompanyDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public company: ICompany,
    private dialogRef: MatDialogRef<CompanyDetailsDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
