import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Computers } from './computers';

describe('Computers', () => {
  let component: Computers;
  let fixture: ComponentFixture<Computers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Computers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Computers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
