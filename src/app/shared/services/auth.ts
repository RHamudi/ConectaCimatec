import { inject, Injectable } from '@angular/core';
import { Auth as FirebaseAuth, signInWithEmailAndPassword, UserCredential, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Database } from 'firebase/database';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class Auth {
  private firebaseAuth = inject(FirebaseAuth);
  private userSubject = new BehaviorSubject<any>(null);
  private userServices = inject(User);

  async createUser(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  async login(email: string, password: string) {
    let credential = await signInWithEmailAndPassword(this.firebaseAuth,email, password);
    if (credential) {
      this.userSubject.next(credential.user);
      return credential.user;
    } else {
      throw new Error('Login failed');
    }
  }

  getAuthState(){
    return this.firebaseAuth.authStateReady;
  }
}
