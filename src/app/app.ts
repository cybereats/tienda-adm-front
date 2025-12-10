import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CSidenav } from './components/ui/c-sidenav/c-sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CSidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  paths = ['/admin/login', '/admin/register']
  currentPath = ''

  constructor(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) this.currentPath = e.url
    })
  }
}
