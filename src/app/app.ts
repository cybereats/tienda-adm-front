import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CSidenav } from './components/ui/c-sidenav/c-sidenav';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CSidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly router = inject(Router)
  paths = ['/admin/login', '/admin/register']
}
