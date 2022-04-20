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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: User;
  registerForm: FormGroup;
  // firstName: string = '';
  // lastName: string = '';
  // email: string = '';
  // password: string = '';
  // website: string = '';

  constructor(private FB: FormBuilder, private userService: UserService) {
    this.registerForm = FB.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        website: ['', Validators.required],
        // college:["", Validators.required],
        // gender: ["", Validators.required]
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  PostData(registerForm: any) {
    // this.user.firstName = registerForm.controls.firstName.value;
    // this.user.lastName = registerForm.controls.lastName.value;
    // this.user.email = registerForm.controls.email.value;
    // this.user.password = registerForm.controls.password.value;
    // this.user.website = registerForm.controls.website.value;
    // console.log(registerForm.controls);
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      // this.user = Object.assign(this.user, this.registerForm.value);
      this.userService.addUser(this.userData());
    }
  }

  userData(): User {
    return (this.user = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      website: this.website.value,
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  // get firstName() {
  //   return this.registerForm.get('firstName') as FormControl;
  // }

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

  // success = '';
  // registerForm = new FormGroup(
  //   {
  // firstName: new FormControl('', [Validators.required]),
  // lastName: new FormControl('', [Validators.required]),
  // email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(8)
  //     ]),
  //     confirmPassword: new FormControl('', [Validators.required])
  //   },

  // CustomValidators.mustMatch('password', 'confirmPassword') // insert here
  // );
  // submitted = false;

  // openDialog(){
  //   this.dialog.open(DialogComponent )
  // }

  // get firstNameValidator(){
  //   return this.registerForm.get('firstName');
  // }

  // get lastNameValidator(){
  //   return this.registerForm.get('lastName');
  // }

  // get fields() {
  //   return this.registerForm.controls;
  // }

  // onSubmit() {
  //   this.submitted = true;

  // stop here if form is invalid
  //   if (this.registerForm.invalid) {
  //     return;
  //   }

  //   this.success = JSON.stringify(this.registerForm.value);
  // }

  ngOnInit(): void {}
}
