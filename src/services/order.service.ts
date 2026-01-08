import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService extends HTTPService {
    override url = '/api/user-orders';
}
