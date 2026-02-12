import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Computer, PCStatus } from '../../../../models/computer.model';
import { CStatus } from '../c-status/c-status';

@Component({
    selector: 'c-computer-card',
    standalone: true,
    imports: [CStatus],
    templateUrl: './c-computer-card.html',
    styleUrl: './c-computer-card.scss',
})
export class CComputerCard {
    @Input() computer!: Computer;
    @Input() statusOptions: { value: PCStatus, label: string, color: string }[] = [];
    @Output() edit = new EventEmitter<Computer>();
    @Output() delete = new EventEmitter<Computer>();
    @Output() statusChange = new EventEmitter<{ computer: Computer, status: PCStatus }>();


    onEdit(): void {
        this.edit.emit(this.computer);
    }

    onDelete(): void {
        this.delete.emit(this.computer);
    }

    onStatusChange(newStatus: string): void {
        this.statusChange.emit({ computer: this.computer, status: newStatus as PCStatus });
    }
}
