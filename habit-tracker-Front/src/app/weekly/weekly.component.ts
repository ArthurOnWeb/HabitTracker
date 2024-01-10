import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';
import { Habit } from '../habit';
import { HabitService } from '../habit.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [NavbarComponent, NgFor],
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css'
})
export class WeeklyComponent implements OnInit {

  days : string[] = ["Mon", "Tue", "Wes", "Thu", "Fri", "Sat", "Sun"];

  habits!: Habit[]; // Define a property to store the retrieved habits
  username: string | undefined; // Define a property to store the username

  constructor(private habitService: HabitService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Call the getHabit function when the component initializes
    this.getHabit();
    
  }
  
  getHabit() {
    // Get the username from local storage and provide a default value (e.g., empty string)
    this.username = localStorage.getItem('username') || '';

    // Call the getHabits method from your HabitService
    this.habitService.getHabits(this.username).subscribe(
      (response : Habit[]) => {
        // Successfully retrieved habits, store them in the habits property
        this.habits = response;
      },
      (error) => {
        // Handle errors here
        console.error('Error retrieving habits:', error);
      }
    );

  }
  
}