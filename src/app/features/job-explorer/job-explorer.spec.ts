import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExplorer } from './job-explorer';

describe('JobExplorer', () => {
  let component: JobExplorer;
  let fixture: ComponentFixture<JobExplorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobExplorer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobExplorer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
