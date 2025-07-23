import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, equalTo, get, orderByChild, push, query, ref, set, update } from '@angular/fire/database';
import { Business, Vaga } from '../../../core/models/business/business';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

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
    ...(currentBusiness?.publishedJobs || []),
    newVagaRef.key                               
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

    const worksRef = ref(this.db, 'works');

    const worksQuery = query(
      worksRef,
      orderByChild('empresaUid'),
      equalTo(empresaUid)
    );

    const snapshot = await get(worksQuery);

    const worksList: Vaga[] = [];
    snapshot.forEach((childSnapshot) => {
      worksList.push({
        id: childSnapshot.key,
        ...childSnapshot.val() 
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

  getJobById(jobId: string): Observable<any> {
    const jobRef = ref(this.db, `works/${jobId}`);
    return from(get(jobRef)).pipe(
      map(snapshot => snapshot.exists() ? snapshot.val() : null)
    );
  }

  updateJob(jobId: string, jobData: any): Observable<void> {
    const jobRef = ref(this.db, `works/${jobId}`);
    return from(update(jobRef, jobData));
  }
}
