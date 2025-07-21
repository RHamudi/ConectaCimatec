import { Component } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { Auth } from '../../shared/services/auth/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/services/user';
import { Router } from '@angular/router';
import { BusinessService } from '../../shared/services/business/business-service';
import { Business, Vaga } from '../../core/models/business/business';

@Component({
  selector: 'app-register-new-job',
  imports: [Navbar, ReactiveFormsModule],
  templateUrl: './register-new-job.html',
  styleUrl: './register-new-job.css'
})
export class RegisterNewJob {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private businessService: BusinessService) {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      skills: ['', Validators.required],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      type: ['', [Validators.required]],
      shift: ['', [Validators.required]],
      salary: [null, [Validators.required, Validators.min(0)]],
      Requirements: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  
  onSubmit() {
    let skillsArray = this.userForm.value.skills.split(',').map((skill: string) => skill.trim()); // Convertendo string para array
    console.log(skillsArray);
    const businessData: Business = {
      title: this.userForm.value.title,
      skills: skillsArray,
      description: this.userForm.value.description,
      location: this.userForm.value.location,
      type: this.userForm.value.type,
      shift: this.userForm.value.shift,
      salary: this.userForm.value.salary,
      Requirements: this.userForm.value.Requirements,
      deadline: this.userForm.value.deadline,
      status: this.userForm.value.status,
    };

    if (this.userForm.valid) {
      this.businessService.createJob(businessData).then((data) => {
        console.log('Job registered successfully');
        this.router.navigate(['/publishedJobs']);
      }).catch((error) => {
        console.error('Error registering job:', error);
      });
    }
  }
  }
