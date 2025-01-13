import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { IOffer } from '../../models/offer';
import { OfferService } from '../../services/offer-service/offer.service';
import { CompanyService } from '../../services/company-service/company.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-offer-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './offer-details-dialog.component.html',
  styleUrls: ['./offer-details-dialog.component.css'],
})
export class OfferDetailsDialogComponent implements OnInit {
  isDeleting = false;
  companyName: string = 'Unknown'; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public offer: IOffer,
    private dialogRef: MatDialogRef<OfferDetailsDialogComponent>,
    private offerService: OfferService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanyById(this.offer.companyId).subscribe({
      next: (company) => {
        this.companyName = company.name;
      },
      error: (err) => {
        console.error('Error fetching company:', err);
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteOffer(): void {
    this.isDeleting = true;
    this.offerService
      .deleteOffer(this.offer.id, this.offer.companyId)
      .subscribe({
        next: () => {
          this.isDeleting = false;

          this.snackBar.open('Offer was successfully deleted!', 'Close', {
            duration: 3000, 
          });

          this.dialogRef.close({ deleted: true });
        },
        error: (err) => {
          console.error('Error deleting offer:', err);

          this.snackBar.open(
            'Failed to delete the offer. Try again later.',
            'Close',
            {
              duration: 3000,
            }
          );

          this.isDeleting = false;
        },
      });
  }
}
