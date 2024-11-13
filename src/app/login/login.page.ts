import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Call the login function in AuthService
      this.authService.login(formData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Store the token in localStorage
          this.authService.storeToken(response.token);
          // Redirect to the dashboard page after a successful login
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your email and password and try again.');
        }
      });
    } else {
      console.log("Form is not valid");
    }
  }
}
