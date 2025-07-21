import { Component } from '@angular/core';
import { Navbar } from "../../core/components/navbar/navbar";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  imports: [Navbar, RouterModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile {

}
