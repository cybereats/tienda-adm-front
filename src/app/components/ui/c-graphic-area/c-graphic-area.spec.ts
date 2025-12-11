import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CGraphicArea } from './c-graphic-area';

describe('CGraphicArea', () => {
  let component: CGraphicArea;
  let fixture: ComponentFixture<CGraphicArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CGraphicArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CGraphicArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
