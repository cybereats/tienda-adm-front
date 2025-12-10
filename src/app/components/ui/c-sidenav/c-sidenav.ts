import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'c-sidenav',
  imports: [RouterLink],
  templateUrl: './c-sidenav.html',
  styleUrl: './c-sidenav.scss',
})

export class CSidenav {
  sideNavItems = [
    { name: 'Inicio', icon: 'home.png', route: '/admin' },
    { name: 'Estadísticas', icon: 'stats.png', route: '/admin/stats' },
    { name: 'Pedidos', icon: 'orders.png', route: '/admin/orders' },
    { name: 'Productos', icon: 'products.png', route: '/admin/products' },
    { name: 'Ordenadores', icon: 'computers.png', route: '/admin/computers' },
    { name: 'Incidencias', icon: 'reports.png', route: '/admin/reports' },
  ]
}
