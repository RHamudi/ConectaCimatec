import { inject, Injectable } from '@angular/core';
import { Database, push, ref } from '@angular/fire/database';
import { Register } from '../../core/user/register';
import { set } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class User {
  private db = inject(Database);

  addUser(user: Register) {
    const usersRef = ref(this.db, 'users');
    const newUserRef = push(usersRef);
    return set(newUserRef, user);
  }
}
