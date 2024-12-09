import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllListingsComponent } from './get-all-listings.component';

describe('GetAllListingsComponent', () => {
  let component: GetAllListingsComponent;
  let fixture: ComponentFixture<GetAllListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
