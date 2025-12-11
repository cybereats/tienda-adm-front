import { Routes } from '@angular/router';
import { Index } from './components/pages/index/index';
import { Stats } from './components/pages/stats/stats';
import { Orders } from './components/pages/orders/orders';
import { Products } from './components/pages/products/products';
import { Reports } from './components/pages/reports/reports';
import { Computers } from './components/pages/computers/computers';
import { Login } from './components/pages/login/login';
import { Register } from './components/pages/register/register';

export const routes: Routes = [
    { path: 'admin', component: Index },
    { path: 'admin/stats', component: Stats },
    { path: 'admin/orders', component: Orders },
    { path: 'admin/products', component: Products },
    { path: 'admin/reports', component: Reports },
    { path: 'admin/computers', component: Computers },
    { path: 'admin/login', component: Login },
    { path: 'admin/register', component: Register },
    { path: '**', redirectTo: 'admin' }
];
