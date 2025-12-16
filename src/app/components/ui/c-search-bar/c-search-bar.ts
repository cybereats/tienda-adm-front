import { Component, Input } from '@angular/core';

@Component({
    selector: 'c-search-bar',
    standalone: true,
    imports: [],
    templateUrl: './c-search-bar.html',
    styleUrl: './c-search-bar.scss',
})
export class CSearchBar {
    @Input() placeholder: string = 'Buscar...';
}
