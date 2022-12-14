import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emmiters/emmiters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe({
      next: (auth: boolean) => (this.authenticated = auth),
      error: (error: any) => console.log(error),
    });
  }

  logout() {
    localStorage.clear();
    Emitters.authEmitter.emit(false);
    this.ngOnInit();
    this.router.navigate(['/login']);
  }
}
