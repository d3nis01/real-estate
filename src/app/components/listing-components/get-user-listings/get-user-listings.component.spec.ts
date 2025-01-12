import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserListingsComponent } from './get-user-listings.component';

describe('GetAllListingsComponent', () => {
  let component: GetUserListingsComponent;
  let fixture: ComponentFixture<GetUserListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetUserListingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetUserListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
