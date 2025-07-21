import { Component, inject } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Database, ref, get, update } from '@angular/fire/database';
import { Auth } from '../../shared/services/auth/auth';

@Component({
  selector: 'app-edit-profile',
  imports: [Navbar, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile {
  form: FormGroup;
  user: any = {};
  modalAberto = false;

  private db = inject(Database);
  private auth = inject(Auth);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      localizacao: [''],
      site: [''],
      descricao: [''],
      skills: ['']
    });
  }

  async ngOnInit() {
    const uid = this.auth.currentUser?.uid;
    if (uid) {
      const userRef = ref(this.db, `users/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        this.user = snapshot.val();
        this.form.patchValue({
          name: this.user.name || '',
          localizacao: this.user.localizacao || '',
          site: this.user.site || '',
          descricao: this.user.descricao || '',
          skills: (this.user.skills || []).join(', ')
        });
      }
    }
  }

  async salvar() {
    const dados = this.form.value;
    const updatedUser = {
      ...this.user,
      name: dados.name || this.user.name,
      localizacao: dados.localizacao || this.user.localizacao,
      site: dados.site || this.user.site,
      descricao: dados.descricao || this.user.descricao,
      skills: dados.skills
        ? dados.skills.split(',').map((s: string) => s.trim())
        : this.user.skills
    };

    const uid = this.auth.currentUser?.uid;
    if (uid) {
      const userRef = ref(this.db, `users/${uid}`);
      await update(userRef, updatedUser);
      this.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(this.user));
    }
    this.fecharModal();
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }
}
