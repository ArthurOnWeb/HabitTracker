import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [NavbarComponent, NgFor],
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css'
})
export class WeeklyComponent {

  days : string[] = ["Mon", "Tue", "Wes", "Thu", "Fri", "Sat", "Sun"];

  

}
