import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ConfirmedValidator } from '../../../confirmed.validator';
import { User } from 'src/app/models/user';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: User;
  registerForm: FormGroup;
  today = new Date();
  url: string = environment.avatar;

  constructor(
    private FB: FormBuilder,
    private mainService: MainService,
    private router: Router
  ) {
    this.registerForm = FB.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        website: ['', Validators.required],
        college: ['', Validators.required],
        strength_A: [false, Validators.required],
        strength_B: [false, Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        about: ['', Validators.required],
        image: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  PostData(registerForm: any) {
    if (this.registerForm.valid) {
      if (this.mainService.duplicateMail(this.f.email.value)) {
        alertify.error('Email already registered.');
      } else {
        this.mainService.addUser(this.userData());
        alertify.success('Registeration Successful!');
        this.router.navigate(['/']);
      }
    } else {
      alertify.error('Please fill the required fields.');
    }
  }

  // PostData(registerForm: any) {
  //   if (this.registerForm.valid) {
  //     this.mainService.addUser(this.userData());
  //     alertify.success('Registeration Successful!');
  //     this.router.navigate(['/']);
  //   } else {
  //     alertify.error('Please fill the required fields.');
  //   }
  // }

  userData(): User {
    return (this.user = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      password: this.f.password.value,
      website: this.f.website.value,
      college: this.f.college.value,
      strength_A: this.f.strength_A.value,
      strength_B: this.f.strength_B.value,
      gender: this.f.gender.value,
      dob: this.f.dob.value,
      about: this.f.about.value,
      image: this.url,
    });
  }

  //image conversion
  selectFile(event) {
    if (event.target.files) {
      let reader = new FileReader();
      let file = reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        // console.log((this.url = event.target.result));
        this.url = event.target.result;
      };
      // reader.onloadend = function () {
      //   reader.result;
      // };
    }
  }

  //getter method

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {}
}
