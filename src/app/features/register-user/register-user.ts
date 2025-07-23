import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterInput, role } from '../../core/models/user/register';
import { Auth } from '../../shared/services/auth/auth';
import { User } from '../../shared/services/user';
import { Navbar } from "../../core/components/navbar/navbar";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule, Navbar, RouterModule],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css'
})
export class RegisterUser {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: Auth, private userService: User, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, , Validators.email],
      password: ['', [Validators.required]],
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  onSubmit(){
    const user: RegisterInput = {
      email: this.userForm.value.email,
      name: this.userForm.value.name,
      password: this.userForm.value.password,
      role: role.ALUNO,
      portifolioUrl: [],
      skills: []
    }
    if(this.userForm.valid) {
      this.authService.createUser(user.email, user.password).then((userCredential) => {
        const uid = userCredential.user.uid;

        this.userService.addUser({
          ...user,
          uid: uid,
        }).then(() => {
          this.router.navigate(['/login'])
          console.log('User registered successfully');
        }).catch((error) => {
          console.error('Error registering user:', error);
        });
      })
    }
  }
}