import { Component, signal, inject } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Database, ref, get, child } from '@angular/fire/database';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  userForm: FormGroup;
  private db = inject(Database);
  protected readonly title = signal('ConectaCimatec');

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

  // getUsers(): Observable<User[]> {
  //   const dbRef = ref(this.db, 'users');
  //   return from(get(dbRef)).pipe(
  //     map(snapshot => {
  //       const data = snapshot.val();
  //       if (!data) return [];
  //       return Object.entries(data).map(([id, value]) => ({
  //         id,
  //         ...(value as Omit<User, 'id'>)
  //       }));
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching users:', error);
  //       return of([]);
  //     })
  //   );
  // }
}

interface User {
  name: string;
  email: string;
}