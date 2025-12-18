import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ReportService extends HTTPService {
    override url = '/api/reports';
}