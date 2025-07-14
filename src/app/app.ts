import { Component, signal, inject } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Database, ref, get, child } from '@angular/fire/database';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Auth } from './shared/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}