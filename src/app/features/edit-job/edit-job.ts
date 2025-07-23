import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../shared/services/business/business-service';
import { Navbar } from "../../core/components/navbar/navbar";

@Component({
  selector: 'app-edit-job',
  imports: [CommonModule, Navbar, ReactiveFormsModule],
  templateUrl: './edit-job.html',
  styleUrl: './edit-job.css'
})
export class EditJob {
  userForm!: FormGroup;
  jobId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;

    // Inicializa o form
    this.userForm = this.fb.group({
      title: [''],
      skills: [''],
      description: [''],
      location: [''],
      type: [''],
      shift: [''],
      salary: [''],
      Requirements: [''],
      deadline: [''],
      status: [''],
    });

    
    this.businessService.getJobById(this.jobId).subscribe((vaga: any) => {
      if (vaga) {
        this.userForm.patchValue(vaga);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.businessService.updateJob(this.jobId, this.userForm.value).subscribe(() => {
        alert('Vaga atualizada com sucesso!');
        this.router.navigate(['/publishedJobs']); // redirecione conforme sua rota
      });
    }
  }
}
