import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGamerComponent } from './profile-gamer.component';

describe('ProfileGamerComponent', () => {
  let component: ProfileGamerComponent;
  let fixture: ComponentFixture<ProfileGamerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileGamerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
