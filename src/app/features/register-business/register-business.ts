import { Component } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../shared/services/auth/auth';
import { User } from '../../shared/services/user';
import { RegisterBusinessInput } from '../../core/models/user/register';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-business',
  imports: [Navbar, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register-business.html',
  styleUrl: './register-business.css'
})
export class RegisterBusiness {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: Auth, private userService: User, private router: Router) {
    this.userForm = this.fb.group({
      companyName: ['', Validators.required],
      CNPJ: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  onsubmit() {
    const business: RegisterBusinessInput = {
      companyName: this.userForm.value.companyName,
      CNPJ: this.userForm.value.CNPJ,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      location: this.userForm.value.location
    };

    if (this.userForm.valid) {
      this.authService.addBusiness(business).then(() => {
        
      }).catch((error) => {
        console.error('Error registering business:', error);
      }); 
    }
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
