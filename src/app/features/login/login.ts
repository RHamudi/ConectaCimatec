import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../shared/services/auth/auth';
import { Navbar } from "../../core/components/navbar/navbar";
import { Router, RouterModule } from '@angular/router';
import { Database, get, ref } from '@angular/fire/database';
import { Alert } from "../../core/components/alert/alert/alert";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Navbar, RouterModule, Alert],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  userForm: FormGroup;
  alertaMensagem = '';
  alertaTipo: 'success' | 'error' | 'info' | 'warning' = 'info';
  private db = inject(Database);

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  exibirAlerta(mensagem: string, tipo: 'success' | 'error' | 'info' | 'warning') {
    this.alertaMensagem = mensagem;
    this.alertaTipo = tipo;

    setTimeout(() => {
      this.alertaMensagem = '';
    }, 4000);
  }

  async onSubmit() {
    if (this.userForm.invalid) {
      this.exibirAlerta('Preencha todos os campos corretamente.', 'error');
      return;
    }

    const { email, password } = this.userForm.value;

    try {
      this.exibirAlerta('Verificando credenciais...', 'info');

      const credential = await this.authService.login(email, password);
      const token = await credential.getIdToken();
      const userId = credential.uid;

      const userRef = ref(this.db, `users/${userId}`);
      const userSnap = await get(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.val();
        localStorage.setItem('role', userData.role);
        localStorage.setItem('user', JSON.stringify(userData));

        this.authService.userSubject.next({ user: credential, token, authenticated: true, uid: userId });
        this.router.navigate(['/jobExplorer']);
        this.exibirAlerta('Login realizado com sucesso!', 'success');
        return;
      }

      const businessRef = ref(this.db, `business/${userId}`);
      const businessSnap = await get(businessRef);

      if (businessSnap.exists()) {
        const businessData = businessSnap.val();
        localStorage.setItem('role', businessData.role);
        localStorage.setItem('business', JSON.stringify(businessData));

        this.authService.userSubject.next({ user: credential, token, authenticated: true, uid: userId });
        this.router.navigate(['/publishedJobs']);
        this.exibirAlerta('Login da empresa realizado com sucesso!', 'success');
        return;
      }

      this.exibirAlerta('Usuário não encontrado na base de dados.', 'warning');
    } catch (error: any) {
      console.error('Erro ao logar ou buscar usuário:', error);
      this.exibirAlerta(error?.message || 'Erro ao realizar login.', 'error');
    }
  }
}