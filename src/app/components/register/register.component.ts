import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
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
  url: string =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1650470203~exp=1650470803~hmac=49af70e25ab74f50bc4943f3711f9b99ab7f9266d34dc3083040cc30830c3c2c&w=826';

  imageBase64: any;

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
        image: [''],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  PostData(registerForm: any) {
    console.log(this.registerForm.value);
    console.log(this.imageBase64);
    if (this.registerForm.valid) {
      this.userService.addUser(this.userData());
      alertify.success('Registeration Successful!');
      this.router.navigate(['/dashboard']);
    } else {
      alertify.error('Something went wrong! Please try again.');
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
      image: this.imageBase64,
    });
  }

  selectFile(event) {
    if (event.target.files) {
      let reader = new FileReader();
      let file = reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.onloadend = function () {
        console.log('Encoded Base 64 File String:', reader.result);
      };
    }
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
  get f() {
    return this.registerForm.controls;
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

  // get image() {
  //   return this.registerForm.get('image') as FormControl;
  // }

  ngOnInit(): void {}
}
