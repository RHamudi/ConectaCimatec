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
  constructor(public router: Router) { 
    this.route = this.router.url.split('/')[1] || '';
  }

  get isLoggedRole(): string {
    return localStorage.getItem('role') || '';
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
    console.log('Navegando para o perfil do usuário');
  }

  getUserName(): string {
    const user = localStorage.getItem('user');
    const business = localStorage.getItem('business');
    if (user) {
      try {
        const { name } = JSON.parse(user);
        return name;
      } catch {
        return '';
      }
    }
    if (business) {
      try {
        const { companyName } = JSON.parse(business);
        return companyName;
      } catch {
        return '';
      }
    }
    return '';
  }
}
