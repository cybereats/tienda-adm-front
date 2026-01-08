import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductsResponse } from '../models/product.model';
import { HTTPService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends HTTPService {
    override url = '/api/users';
}