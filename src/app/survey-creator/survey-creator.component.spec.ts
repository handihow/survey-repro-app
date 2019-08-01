import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCreatorComponent } from './survey-creator.component';

describe('SurveyCreatorComponent', () => {
  let component: SurveyCreatorComponent;
  let fixture: ComponentFixture<SurveyCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
