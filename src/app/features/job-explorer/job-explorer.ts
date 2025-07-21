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
  constructor(private businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.getAllWorks().then((data) => {
      console.log('Vagas disponíveis:', data);
      this.publishedJobs = data;
    });
  }
}
