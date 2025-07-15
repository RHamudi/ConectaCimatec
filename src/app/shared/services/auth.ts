import { inject, Injectable } from '@angular/core';
import { Auth as FirebaseAuth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Auth {
  private firebaseAuth = inject(FirebaseAuth);
  private userSubject = new BehaviorSubject<any>(null);

  async login(email: string, password: string) {
    let credential = await signInWithEmailAndPassword(this.firebaseAuth,email, password);
    if (credential) {
      this.userSubject.next(credential.user);
      return credential.user;
    } else {
      throw new Error('Login failed');
    }
  }
  
}
