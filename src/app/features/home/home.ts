import { Component } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navbar, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
