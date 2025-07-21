import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedJobs } from './published-jobs';

describe('PublishedJobs', () => {
  let component: PublishedJobs;
  let fixture: ComponentFixture<PublishedJobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedJobs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedJobs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
