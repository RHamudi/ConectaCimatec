import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
   userForm: FormGroup;

    constructor(private fb: FormBuilder,private authService: Auth) {
    this.userForm = this.fb.group({
      email: ['', Validators.required, , Validators.email],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if (this.userForm.valid) {
      console.log(this.authService.login(this.userForm.value.email, this.userForm.value.password));
      // Here you would typically send the data to your backend or Firebase
    } else {
      console.error('Form is invalid');
    }
  }

}
