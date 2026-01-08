import { Routes } from '@angular/router';
import { Index } from './components/pages/index/index';
import { Stats } from './components/pages/stats/stats';
import { Orders } from './components/pages/orders/orders';
import { Products } from './components/pages/products/products';
import { Reports } from './components/pages/reports/reports';
import { Computers } from './components/pages/computers/computers';
import { Login } from './components/pages/login/login';
import { authGuard } from '../guards/auth.guard';
import { guestGuard } from '../guards/guest.guard';
import { Users } from './components/pages/users/users';

export const routes: Routes = [
    { path: 'admin', component: Index, canActivate: [authGuard] },
    { path: 'admin/stats', component: Stats, canActivate: [authGuard] },
    { path: 'admin/users', component: Users, canActivate: [authGuard] },
    { path: 'admin/orders', component: Orders, canActivate: [authGuard] },
    { path: 'admin/products', component: Products, canActivate: [authGuard] },
    { path: 'admin/reports', component: Reports, canActivate: [authGuard] },
    { path: 'admin/computers', component: Computers, canActivate: [authGuard] },
    { path: 'admin/login', component: Login, canActivate: [guestGuard] },

    // { path: 'admin/register', component: Register, canActivate: [guestGuard] },
    { path: '**', redirectTo: 'admin/login' }
];
