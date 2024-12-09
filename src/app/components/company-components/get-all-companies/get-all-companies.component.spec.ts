import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCompaniesComponent } from './get-all-companies.component';

describe('GetAllCompaniesComponent', () => {
  let component: GetAllCompaniesComponent;
  let fixture: ComponentFixture<GetAllCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllCompaniesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
