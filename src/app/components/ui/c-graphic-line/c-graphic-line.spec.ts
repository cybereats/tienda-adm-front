import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CGraphicLine } from './c-graphic-line';

describe('CGraphicLine', () => {
  let component: CGraphicLine;
  let fixture: ComponentFixture<CGraphicLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CGraphicLine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CGraphicLine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
