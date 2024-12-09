import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllOffersComponent } from './get-all-offers.component';

describe('GetAllOffersComponent', () => {
  let component: GetAllOffersComponent;
  let fixture: ComponentFixture<GetAllOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
