import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private mainService: MainService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginUser() {
    const token = this.mainService.authUser(this.loginForm.value);
    if (token) {
      localStorage.setItem('token', token.email);
      alertify.success('Login Successful');
      this.router.navigate(['dashboard']);
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
