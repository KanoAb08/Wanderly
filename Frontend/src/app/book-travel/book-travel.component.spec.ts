import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTravelComponent } from './book-travel.component';

describe('BookTravelComponent', () => {
  let component: BookTravelComponent;
  let fixture: ComponentFixture<BookTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
