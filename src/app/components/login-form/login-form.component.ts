import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor() {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginUser() {
    console.warn(this.loginForm.value);
  }

  get emailValidator() {
    return this.loginForm.get('email');
  }

  get passwordValidator() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}
}
