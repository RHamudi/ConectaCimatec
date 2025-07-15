import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from 'firebase/auth';
import { User } from '../../shared/services/user';
import { Register } from '../../core/user/register';

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css'
})
export class RegisterUser {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,private userServices: User) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, , Validators.email],
      password: ['', [Validators.required]],
      role: ['', Validators.required]
    });
  }

  onSubmit(){
    const user: Register = {
      email: this.userForm.value.email,
      name: this.userForm.value.name,
      password: this.userForm.value.password,
      role: this.userForm.value.role,
      portifolioUrl: [],
      skills: []
    }
    if(this.userForm.valid) {
      console.log(this.userServices.addUser(user));
    }
  }
}