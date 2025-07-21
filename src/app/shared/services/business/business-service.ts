import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, equalTo, get, orderByChild, push, query, ref, set, update } from '@angular/fire/database';
import { Business, Vaga } from '../../../core/models/business/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private db = inject(Database);
  private authService = inject(Auth);

  async createJob(businessData: Business) {
    const vagaListRef = ref(this.db, 'works');
    const newVagaRef = push(vagaListRef);

    const businessRef = ref(this.db, `business/${this.authService.currentUser?.uid}`);
    const snapshot = await get(businessRef);
    const currentBusiness = snapshot.val();

    const updatedJobs = [
    ...(currentBusiness?.publishedJobs || []), // Jobs atuais (ou array vazio se não existir)
    newVagaRef.key                               // Novos jobs
  ];
    
    return set(newVagaRef, {
      ...businessData,
      empresaUid: this.authService.currentUser?.uid,
      uid: newVagaRef.key
    }).then(() => {
      update(businessRef, {
        publishedJobs: updatedJobs
      });
    });
  }

  async getWorksByEmpresaUid(empresaUid: string) {
    // 1. Referência à tabela 'works'
    const worksRef = ref(this.db, 'works');

    // 2. Cria a query para filtrar por 'empresaUid'
    const worksQuery = query(
      worksRef,
      orderByChild('empresaUid'),
      equalTo(empresaUid)
    );

    // 3. Executa a consulta
    const snapshot = await get(worksQuery);

    // 4. Mapeia os resultados para um array de objetos
    const worksList: Vaga[] = [];
    snapshot.forEach((childSnapshot) => {
      worksList.push({
        id: childSnapshot.key, // ID único do trabalho
        ...childSnapshot.val() // Dados do trabalho
      });
    });

    return worksList;
  }

  async getAllWorks(): Promise<Vaga[]> {
    const worksRef = ref(this.db, 'works');
    const snapshot = await get(worksRef);

    const worksList: Vaga[] = [];
    snapshot.forEach((childSnapshot) => {
      worksList.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    return worksList;
  }
}
