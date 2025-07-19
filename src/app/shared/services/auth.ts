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
  private userSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    authenticated: false
  });

  public authState$ = this.userSubject.asObservable();

  private userServices = inject(User);

  async createUser(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  async login(email: string, password: string) {
    let credential = await signInWithEmailAndPassword(this.firebaseAuth,email, password);
    const user = credential.user;
    const token = await user.getIdToken();
    if (credential) {
      this.userSubject.next({user, token, authenticated: true});
      return credential.user;
    } else {
      throw new Error('Login failed');
    }
  }

  getAuthState(){
    return this.firebaseAuth.authStateReady;
  }
}

interface AuthState {
  user: any | null;
  token: string | null;
  authenticated: boolean;
}