import { Component, inject } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { BusinessService } from '../../shared/services/business/business-service';
import { Vaga } from '../../core/models/business/business';
import { CommonModule } from '@angular/common';
import { Database, ref, get, update } from '@angular/fire/database';
import { Auth } from '../../shared/services/auth/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-explorer',
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './job-explorer.html',
  styleUrl: './job-explorer.css'
})
export class JobExplorer {
  publishedJobs: Vaga[] = [];
  filteredJobs: Vaga[] = [];
  selectedVaga: Vaga | null = null;
  userSkills: string[] = [];
  filterModalidade: string = '';
  filterTurno: string = '';
  filterStatus: string = '';
  private db = inject(Database);
  private auth = inject(Auth);

  constructor(private businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.getAllWorks().then((data) => {
      this.publishedJobs = data;
      this.filteredJobs = data;
    });
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      this.userSkills = parsed.skills || [];
    }
  }

  selectVaga(vaga: Vaga) {
    this.selectedVaga = vaga;
  }

  calculateMatch(vagaSkills: string[]): number {
    if (!this.userSkills.length || !vagaSkills?.length) return 0;
    const userSet = new Set(this.userSkills.map(s => s.toLowerCase()));
    const vagaSet = vagaSkills.map(s => s.toLowerCase());
    const matchCount = vagaSet.filter(skill => userSet.has(skill)).length;
    const total = vagaSet.length;
    return Math.round((matchCount / total) * 100);
  }

  async aplicarNaVaga() {
    if (!this.selectedVaga) return;
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Usuário não autenticado.');
      return;
    }

    const userData = JSON.parse(user);
    const vagaUid = this.selectedVaga.uid;

    // Referência da vaga na rota works
    const vagaRef = ref(this.db, `works/${vagaUid}`);

    try {
      const snapshot = await get(vagaRef);
      if (!snapshot.exists()) {
        alert('Vaga não encontrada.');
        return;
      }
      let vagaData = snapshot.val();

      // Atualiza ou cria o campo applications
      const applications = vagaData.applications || [];
      applications.push({
        userUid: this.auth.currentUser?.uid,
        ...userData,
        appliedAt: new Date().toISOString()
      });

      await update(vagaRef, {
        ...vagaData,
        applications
      });

      // Atualiza as vagas após aplicar
      this.businessService.getAllWorks().then((data) => {
        this.publishedJobs = data;
        this.filtrarVagas(); // Atualiza filtragem após aplicar
        this.selectedVaga = this.filteredJobs.find(v => v.uid === vagaUid) || null;
      });

      alert('Aplicação enviada com sucesso!');
    } catch (error: any) {
      if (error?.code === 'PERMISSION_DENIED') {
        alert('Permissão negada para aplicar à vaga. Verifique as regras do Firebase.');
      } else {
        alert('Erro ao aplicar à vaga: ' + (error?.message || error));
      }
      console.error('Erro ao aplicar na vaga:', error);
    }
  }

  jaAplicouNaVaga(): boolean {
    if (!this.selectedVaga || !this.auth.currentUser?.uid) return false;
    const applications = this.selectedVaga.applications || [];
    return applications.some((app: any) => app.userUid === this.auth.currentUser?.uid);
  }

  filtrarVagas() {
    this.filteredJobs = this.publishedJobs.filter(vaga => {
      const modalidadeOk = !this.filterModalidade || vaga.type.toLowerCase() === this.filterModalidade.toLowerCase();
      const turnoOk = !this.filterTurno || vaga.shift.toLowerCase() === this.filterTurno.toLowerCase();
      const statusOk = !this.filterStatus || vaga.status.toLowerCase() === this.filterStatus.toLowerCase();

      return modalidadeOk && turnoOk && statusOk;
    });

    // Se a vaga selecionada não estiver mais nos resultados, deseleciona
    if (this.selectedVaga && !this.filteredJobs.some(v => v.uid === this.selectedVaga?.uid)) {
      this.selectedVaga = null;
    }
  }
}
