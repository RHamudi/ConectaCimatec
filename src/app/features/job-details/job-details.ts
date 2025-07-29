import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Database, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-job-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css'
})
export class JobDetails {
  vaga: any = null;
  candidatos: any[] = [];

  private db = inject(Database);
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('id');
    if (uid) {
      const vagaRef = ref(this.db, `works/${uid}`);
      const snapshot = await get(vagaRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.vaga = data;
        this.candidatos = data.applications || [];
      }
    }
  }

  calculateMatch(vagaSkills: string[], candidado: any[]): number {
    if (!candidado.length || !vagaSkills?.length) return 0;
    const userSet = new Set(candidado.map(s => s.toLowerCase()));
    const vagaSet = vagaSkills.map(s => s.toLowerCase());
    const matchCount = vagaSet.filter(skill => userSet.has(skill)).length;
    const total = vagaSet.length;
    return Math.round((matchCount / total) * 100);
  }
}
