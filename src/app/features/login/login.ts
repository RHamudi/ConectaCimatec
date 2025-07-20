import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../shared/services/auth';
import { Navbar } from "../../core/components/navbar/navbar";
import { Router, RouterModule } from '@angular/router';
import { Database, get, ref } from '@angular/fire/database';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Navbar, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
   userForm: FormGroup;
   private db = inject(Database);

    constructor(private fb: FormBuilder,private authService: Auth, private router: Router) {
    this.userForm = this.fb.group({
      email: ['', Validators.required, , Validators.email],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value.email, this.userForm.value.password).then((res)=> {
        this.router.navigate(['/jobExplorer']);
        const currentUserUid = this.authService.currentUser.uid;
        const userRef = ref(this.db, `users/${currentUserUid}`);
        get(userRef).then((res) => {
          localStorage.setItem('roleUser', res.val().role)
          localStorage.setItem('user', JSON.stringify(res.val()));
        });
      }).catch((error) => {
        console.error('Login failed', error );
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
