import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // constructor(public dialog: MatDialog){}

  registerForm: FormGroup = new FormGroup({});
  constructor(private FB:FormBuilder){
    this.registerForm = FB.group({
        firstName:['', [Validators.required]],
        lastName:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        password: ["",[
              Validators.required,
              Validators.minLength(8)
            ]],
        confirmPassword: ["",[Validators.required]],
        // website:["", Validators.required],
        // college:["", Validators.required],
        // gender: ["", Validators.required]
    },
    {
      validator:ConfirmedValidator('password', 'confirmPassword')
    })
  }

  onSubmit(): void {
    console.warn('submitted data:', this.registerForm.value);
  }

  get f()
  {
    return this.registerForm.controls;
  }
  
  get emailValidator(){
    return this.registerForm.get('email');
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

  ngOnInit(): void {
  }

}
