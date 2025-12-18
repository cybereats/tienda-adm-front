import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { Observable } from 'rxjs';
import { CategoryPC } from '../models/computer.model';

@Injectable({
    providedIn: 'root'
})
export class ComputerService extends HTTPService {
    override url = '/api/pcs';

    generateSlug(label: string): string {
        return label.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    getCategoryBySlug(slug: string): Observable<CategoryPC> {
        return this.http.get<CategoryPC>(`/api/categories-pc/${slug}`);
    }
}