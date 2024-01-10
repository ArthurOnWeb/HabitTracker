import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHabitComponent } from './detail-habit.component';

describe('DetailHabitComponent', () => {
  let component: DetailHabitComponent;
  let fixture: ComponentFixture<DetailHabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailHabitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
