import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICompany } from '../../../models/company';
import { CompanyService } from '../../../services/company-service/company.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDetailsDialogComponent } from '../../../company-details-dialog/company-details-dialog.component';

@Component({
  selector: 'app-get-all-companies',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
  ],
  templateUrl: './get-all-companies.component.html',
  styleUrls: ['./get-all-companies.component.css'],
})
export class GetAllCompaniesComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'city',
    'actions',
  ];
  companies: ICompany[] = [];
  totalCount = 0;
  pageSize = 10; // Default page size
  pageIndex = 0; // Current page index

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService
      .getAllCompanies(this.pageIndex + 1, this.pageSize)
      .subscribe((response) => {
        this.companies = response.items;
        this.totalCount = response.totalCount;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCompanies();
  }

  goToDetailsCompany(companyId: string): void {
    this.router.navigate(['/details-company', companyId]);
  }

  openCompanyDetails(company: ICompany): void {
    this.dialog.open(CompanyDetailsDialogComponent, {
      width: '400px',
      data: company, // Pass the selected company data to the dialog
    });
  }
}
