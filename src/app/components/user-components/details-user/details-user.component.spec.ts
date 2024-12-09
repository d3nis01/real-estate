import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailUserComponent } from './details-user.component';

describe('DetailUserComponent', () => {
  let component: DetailUserComponent;
  let fixture: ComponentFixture<DetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetailUserComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to all users page on goToAllUsers', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToAllUsers();
    expect(routerSpy).toHaveBeenCalledWith(['/get-all-users']);
  });

  it('should navigate to update user page on editUser', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const userId = '123';
    component.editUser(userId);
    expect(routerSpy).toHaveBeenCalledWith(['/update-user', userId]);
  });
});
