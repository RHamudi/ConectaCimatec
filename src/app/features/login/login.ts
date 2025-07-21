import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../shared/services/auth/auth';
import { Navbar } from "../../core/components/navbar/navbar";
import { Router, RouterModule } from '@angular/router';
import { Database, get, ref } from '@angular/fire/database';
import { user } from '@angular/fire/auth';



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

  async onSubmit() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;
      try {
        const credential = await this.authService.login(email, password).then((credential) => {
          return credential;
        });
        const token = await credential.getIdToken();
        const userId = credential.uid;
        console.log(userId)

        const userRef = ref(this.db, `users/${userId}`);
        const userSnap = await get(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.val();

          console.log('Usuário comum:', userData);
          localStorage.setItem('role', userData.role)
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigate(['/jobExplorer']);
          this.authService.userSubject.next({user: credential, token, authenticated: true, uid: userId});
        } else {

          const businessRef = ref(this.db, `business/${userId}`);
          const businessSnap = await get(businessRef);

          if (businessSnap.exists()) {
            const businessData = businessSnap.val();

            console.log('Empresa:', businessData);
            localStorage.setItem('role', businessData.role)
            localStorage.setItem('business', JSON.stringify(businessData));
            this.router.navigate(['/publishedJobs']);
            this.authService.userSubject.next({user: credential, token, authenticated: true, uid: userId});
          } else {
            console.error('Usuário não encontrado em users nem em business');
          }
        }
      } catch (error) {
        console.error('Erro ao logar ou buscar usuário:', error);
      }
    }
  }

  // onSubmit(){
  //   if (this.userForm.valid) {
  //     this.authService.login(this.userForm.value.email, this.userForm.value.password).then((res)=> {
  //       this.router.navigate(['/jobExplorer']);
  //       const currentUserUid = this.authService.currentUser.uid;
  //       const userRef = ref(this.db, `users/${currentUserUid}`);
  //       get(userRef).then((res) => {
  //         localStorage.setItem('roleUser', res.val().role)
  //         localStorage.setItem('user', JSON.stringify(res.val()));
  //       }).catch((error) => {
  //         console.error('Error fetching user data:', error);
  //       });
  //       const businessRef = ref(this.db, `business/${currentUserUid}`);
  //       get(businessRef).then((res) => {
  //         if (res.exists()) {
  //           console.log(res.val());
  //           localStorage.setItem('business', JSON.stringify(res.val()));
  //         }
  //       }).catch((error) => {
  //         console.error('Error fetching business data:', error);
  //       });
  //     }).catch((error) => {
  //       console.error('Login failed', error );
  //     });
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }

}
