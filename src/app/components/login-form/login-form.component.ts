import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginUser() {
    console.warn(this.loginForm.value);
    const token = this.authService.authUser(this.loginForm.value);
    if (token) {
      localStorage.setItem('token', token.userName);
      alertify.success('Login Successful');
      this.router.navigate(['/dashboard']);
    } else {
      alertify.error('Failed to login!');
    }
  }

  get emailValidator() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordValidator() {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {}
}
