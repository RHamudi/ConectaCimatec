import { Component } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { RouterModule } from '@angular/router';
import { BusinessService } from '../../shared/services/business/business-service';
import { Auth } from '../../shared/services/auth/auth';
import { Vaga } from '../../core/models/business/business';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-published-jobs',
  imports: [Navbar, RouterModule, CommonModule],
  templateUrl: './published-jobs.html',
  styleUrl: './published-jobs.css'
})
export class PublishedJobs {
  publishedJobs: Vaga[] = [];
  constructor(private businessService: BusinessService, private authService: Auth) {}

  ngOnInit() {
    this.businessService.getWorksByEmpresaUid(this.authService.currentUser?.uid).then((data) => {
      console.log('Vagas publicadas:', data);
      this.publishedJobs = data;
    });
  }
}
