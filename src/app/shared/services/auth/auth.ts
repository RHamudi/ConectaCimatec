import { inject, Injectable } from '@angular/core';
import { Auth as FirebaseAuth, signInWithEmailAndPassword, UserCredential, createUserWithEmailAndPassword, UserInfo } from '@angular/fire/auth';
import {  ref, set } from 'firebase/database';
import { BehaviorSubject } from 'rxjs';
import { user } from '@angular/fire/auth';
import { User as FirebaseUser } from '@angular/fire/auth';
import { RegisterBusiness, RegisterBusinessInput, role } from '../../../core/models/user/register';
import { Database } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class Auth {
  private db = inject(Database);
  private firebaseAuth = inject(FirebaseAuth);
  public userSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    authenticated: false,
    uid: null
  });

  public authState$ = this.userSubject.asObservable();

  clearAuthState() {
    this.userSubject.next({
      user: null,
      token: null,
      authenticated: false,
      uid: null
    });
    localStorage.clear();
  }

  public get currentUser(): FirebaseUser {
    return this.userSubject.value.user;
  }

  public get currentUserInfo() {
    return this.userSubject.value;
  }

  async createUser(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  async addBusiness(business: RegisterBusinessInput) {
    createUserWithEmailAndPassword(this.firebaseAuth, business.email, business.password).then((businessCredential) => {
      const uidBusiness = businessCredential.user.uid;
      const businessData: RegisterBusiness = {
        companyName: business.companyName,
        CNPJ: business.CNPJ,
        email: business.email,
        location: business.location,
        publishedJobs: [],
        siteUrl: '',
        description:  '',
        logoUrl: '',
        role: role.EMPRESA
      }

      const businessRef = ref(this.db, `business/${uidBusiness}`);
      return set(businessRef, {
        ...businessData
      });
    })
  }

  async login(email: string, password: string): Promise<FirebaseUser> {
    let credential = await signInWithEmailAndPassword(this.firebaseAuth,email, password);
    const user = credential.user;
    const token = await user.getIdToken();
    if (credential) {
      return user;
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
  uid: string | null;
}
