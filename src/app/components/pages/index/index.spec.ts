import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Index } from './index';
import { StatsService } from '../../../../services/stats.service';
import { of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { CGraphic } from '../../ui/c-graphic/c-graphic';

describe('Index', () => {
  let component: Index;
  let fixture: ComponentFixture<Index>;
  let statsServiceSpy: jasmine.SpyObj<StatsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StatsService', ['getDailyIncome', 'getDailyBookings', 'getActiveBookings', 'getDailySummary']);
    spy.getDailyIncome.and.returnValue(of({ total: 100 }));
    spy.getDailyBookings.and.returnValue(of({ count: 5 }));
    spy.getActiveBookings.and.returnValue(of({ total: 10, occupied: 3 }));
    spy.getDailySummary.and.returnValue(of([{ hour: 10, income: 50 }]));

    await TestBed.configureTestingModule({
      imports: [Index, CurrencyPipe, CGraphic],
      providers: [
        { provide: StatsService, useValue: spy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Index);
    component = fixture.componentInstance;
    statsServiceSpy = TestBed.inject(StatsService) as jasmine.SpyObj<StatsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch stats on init', () => {
    expect(statsServiceSpy.getDailyIncome).toHaveBeenCalled();
    expect(statsServiceSpy.getDailyBookings).toHaveBeenCalled();
    expect(statsServiceSpy.getActiveBookings).toHaveBeenCalled();
    expect(statsServiceSpy.getDailySummary).toHaveBeenCalled();
  });

  it('should format chart data correctly', () => {
    // Check if barSeries data has 24 elements (0-23 hours)
    expect(component.barSeries.length).toBeGreaterThan(0);
    expect(component.barSeries[0].data.length).toBe(24);
    // Hour 10 should have 50 income
    expect(component.barSeries[0].data[10]).toBe(50);
  });
});
