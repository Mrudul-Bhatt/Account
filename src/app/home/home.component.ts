import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emmiters/emmiters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  emps: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    var token = localStorage.getItem('token');

    if (!token) this.router.navigate(['/login']);

    this.http.get('https://localhost:7238/api/employee').subscribe({
      next: (response) => {
        console.log(response);
        Emitters.authEmitter.emit(true);
      },
      error: (error) => console.log(error),
    });
  }
}
