import { inject, Injectable } from '@angular/core';
import { Database, push, ref } from '@angular/fire/database';
import { RegisterBusinessInput, RegisterDB } from '../../core/models/user/register';
import { set } from 'firebase/database';
import { Auth } from './auth/auth';

@Injectable({
  providedIn: 'root'
})
export class User {
  private db = inject(Database);
  private authService = inject(Auth);

  addUser(user: RegisterDB) {
    const userRef = ref(this.db, `users/${user.uid}`);

    return set(userRef, {
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills || [],
      portfolioUrl: user.portifolioUrl || []
    });
  }


  // addUser(user: Register) {
  //   const userKey = user.name.toLowerCase().replace(/\s+/g, '_');
  //   const usersRef = ref(this.db, `users/${userKey}`);
  //   const newUserRef = push(usersRef);
  //   return set(newUserRef, {
  //     ...user,
  //     id: userKey
  //   });
  // }
}
