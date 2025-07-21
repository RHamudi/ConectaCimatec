import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewJob } from './register-new-job';

describe('RegisterNewJob', () => {
  let component: RegisterNewJob;
  let fixture: ComponentFixture<RegisterNewJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterNewJob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNewJob);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
