import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SummaryCardVariant = 'default' | 'orange' | 'blue' | 'green';

@Component({
    selector: 'c-summary-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './c-summary-card.html',
    styleUrl: './c-summary-card.scss',
})
export class CSummaryCard {
    @Input() title: string = '';
    @Input() value: string | number = 0;
    @Input() variant: SummaryCardVariant = 'default';
}
