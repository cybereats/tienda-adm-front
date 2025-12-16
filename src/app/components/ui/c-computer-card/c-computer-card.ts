import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Computer } from '../../../../models/computer.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'c-computer-card',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './c-computer-card.html',
    styleUrl: './c-computer-card.scss',
})
export class CComputerCard {
    @Input() computer!: Computer;
    @Output() edit = new EventEmitter<Computer>();
    @Output() delete = new EventEmitter<Computer>();

    onEdit(): void {
        this.edit.emit(this.computer);
    }

    onDelete(): void {
        this.delete.emit(this.computer);
    }
}
