import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICompany } from '../../../models/company';
import { CompanyService } from '../../../services/company-service/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-all-companies.component.html',
  styleUrls: ['./get-all-companies.component.css'],
})
export class GetAllCompaniesComponent implements OnInit {
  companies: ICompany[] = [];
  totalCount = 0;
  pageSize = 10; // Default page size
  pageNumber = 1; // Current page

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService
      .getAllCompanies(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.companies = response.items;
        this.totalCount = response.totalCount;
      });
  }

  nextPage(): void {
    if (this.pageNumber * this.pageSize < this.totalCount) {
      this.pageNumber++;
      this.loadCompanies();
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadCompanies();
    }
  }

  goToCreateCompany(): void {
    this.router.navigate(['/create-company']);
  }

  goToDetailsCompany(companyId: string): void {
    this.router.navigate(['/details-company', companyId]);
  }
}
