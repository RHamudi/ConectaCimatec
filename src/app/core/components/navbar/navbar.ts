import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  route: string = '';
  constructor(private router: Router) { 
    this.route = this.router.url.split('/')[1] || '';
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
  // Add any methods or properties needed for the navbar functionality
}
