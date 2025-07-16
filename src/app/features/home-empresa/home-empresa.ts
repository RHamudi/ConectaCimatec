import { Component } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-empresa',
  imports: [Navbar, RouterModule],
  templateUrl: './home-empresa.html',
  styleUrl: './home-empresa.css'
})
export class HomeEmpresa {

}
