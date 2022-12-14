import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  result: boolean;
  errors: string[];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }

  register() {
    console.log(this.form.value);
    this.http
      .post<AuthResponse>(
        'https://localhost:7238/api/Auth/Register',
        this.form.value
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        error: (error) => console.log(error),
      });
  }
}
