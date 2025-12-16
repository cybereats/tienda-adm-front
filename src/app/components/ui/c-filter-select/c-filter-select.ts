import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterOption {
    value: string;
    label: string;
}

@Component({
    selector: 'c-filter-select',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './c-filter-select.html',
    styleUrl: './c-filter-select.scss',
})
export class CFilterSelect {
    @Input() options: FilterOption[] = [];
    @Input() placeholder: string = 'Seleccionar...';
    @Input() value: string = '';
}
