import { Component } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { BusinessService } from '../../shared/services/business/business-service';
import { Vaga } from '../../core/models/business/business';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-explorer',
  imports: [Navbar, CommonModule],
  templateUrl: './job-explorer.html',
  styleUrl: './job-explorer.css'
})
export class JobExplorer {
  publishedJobs: Vaga[] = [];
  selectedVaga: Vaga | null = null;
  userSkills: string[] = [];

  constructor(private businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.getAllWorks().then((data) => {
      console.log('Vagas disponíveis:', data);
      this.publishedJobs = data;
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
}
