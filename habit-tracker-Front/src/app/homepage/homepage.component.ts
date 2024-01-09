import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HabitService } from '../habit.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { stringify } from 'querystring';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  habits!: any[]; // Define a property to store the retrieved habits
  username: string | undefined; // Define a property to store the username

  constructor(private habitService: HabitService, private router: Router) {}

  ngOnInit() {
    // Call the getHabit function when the component initializes
    this.getHabit();
  }

  getHabit() {
    // Get the username from local storage and provide a default value (e.g., empty string)
    this.username = localStorage.getItem('username') || '';

    // Call the getHabits method from your HabitService
    this.habitService.getHabits(this.username).subscribe(
      (data) => {
        // Successfully retrieved habits, store them in the habits property
        this.habits = data;
      },
      (error) => {
        // Handle errors here
        console.error('Error retrieving habits:', error);
      }
    );
  }
}