import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CGraphicSplineArea } from './c-graphic-spline-area';

describe('CGraphicSplineArea', () => {
  let component: CGraphicSplineArea;
  let fixture: ComponentFixture<CGraphicSplineArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CGraphicSplineArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CGraphicSplineArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
