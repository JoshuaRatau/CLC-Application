import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNum: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]], // Adjust pattern for phone validation
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom Validator for Password Match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registerForm.value.name);
      formData.append('surname', this.registerForm.value.surname);
      formData.append('phoneNum', this.registerForm.value.phoneNum);
      formData.append('email', this.registerForm.value.email);
      formData.append('password', this.registerForm.value.password);
  
      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
  
          if (error.status === 422 && error.error?.errors?.email) {
            // Display specific message if the email is already registered
            alert('The email is already registered. Please use a different email.');
          } else {
            // Display a generic error message for other errors
            alert('Registration failed. Please try again.');
          }
  
          // Optional: Log additional error details for debugging
          if (error.error) {
            console.log('Error body:', error.error);
          }
          if (error.status) {
            console.log('HTTP Status:', error.status);
          }
        }
      });
    } else {
      console.log("Form is not valid");
    }
  }
}  