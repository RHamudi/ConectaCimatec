import { Component } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  imports: [Navbar, RouterModule, CarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  parceiros = [
    { name: 'empresa1', logo: 'logo1.jpg'},
    { name: 'empresa2', logo: 'logo2.jpg'},
    { name: 'empresa3', logo: 'logo3.jpg'},
    { name: 'empresa4', logo: 'logo4.jpg'},
    { name: 'empresa5', logo: 'logo5.jpg'},
    { name: 'empresa6', logo: 'logo6.jpg'},
    { name: 'empresa7', logo: 'logo7.jpg'},
    { name: 'empresa8', logo: 'logo8.jpg'},
    { name: 'empresa9', logo: 'logo9.jpg'},
    { name: 'empresa10', logo: 'logo10.jpg'},
    { name: 'empresa11', logo: 'logo11.jpg'},
    { name: 'empresa12', logo: 'logo12.jpg'},
    { name: 'empresa13', logo: 'logo13.jpg'},
    { name: 'empresa14', logo: 'logo14.png'},
    { name: 'empresa15', logo: 'logo15.png'},
    { name: 'empresa16', logo: 'logo16.png'}
  ]
}
