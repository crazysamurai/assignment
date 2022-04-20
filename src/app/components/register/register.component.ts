import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: User;
  registerForm: FormGroup;
  today = new Date();

  constructor(
    private FB: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = FB.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        website: ['', Validators.required],
        college: ['', Validators.required],
        strength_A: [false],
        strength_B: [false],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        about: [''],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  PostData(registerForm: any) {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.userService.addUser(this.userData());
      alertify.success('Registeration Successful!');
      console.log('successful');
      this.router.navigate(['/dashboard']);
    } else {
      alertify.error('Something went wrong! Please try again.');
      console.log('unsuccessful');
    }
  }

  userData(): User {
    return (this.user = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      website: this.website.value,
      college: this.college.value,
      strength_A: this.strength_A.value,
      strength_B: this.strength_B.value,
      gender: this.gender.value,
      dob: this.dob.value,
      about: this.about.value,
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  //getter methods

  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  get website() {
    return this.registerForm.get('website') as FormControl;
  }

  get college() {
    return this.registerForm.get('college') as FormControl;
  }

  get strength_A() {
    return this.registerForm.get('strength_A') as FormControl;
  }

  get strength_B() {
    return this.registerForm.get('strength_B') as FormControl;
  }

  get gender() {
    return this.registerForm.get('gender') as FormControl;
  }

  get dob() {
    return this.registerForm.get('dob') as FormControl;
  }

  get about() {
    return this.registerForm.get('about') as FormControl;
  }

  ngOnInit(): void {}
}
