import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { Habit } from '../habit';
import { HabitService } from '../habit.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [NavbarComponent, NgFor, NgIf],
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css'
})
export class WeeklyComponent implements OnInit {

  days : string[] = ["Mon", "Tue", "Wes", "Thu", "Fri", "Sat", "Sun"];
  today!: Date; // Define a property to store today's date
  habits!: Habit[]; // Define a property to store the retrieved habits
  username: string | undefined; // Define a property to store the username

  constructor(private habitService: HabitService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Call the getHabit function when the component initializes
    this.getHabit();
    this.today = new Date('2024-01-11T00:00:00'); // Assurez-vous que le fuseau horaire est correct
    
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


  goToDetailHabit(habit: Habit){
    this.router.navigate(['/habit', habit._id])
  }

  isDayChecked(habit: Habit, day: string): boolean {
    const dayIndex = this.days.indexOf(day);
    const todayIndex = this.today.getUTCDay();
    const diff = (dayIndex + 1) - todayIndex;
    const targetDate = new Date(this.today);
    targetDate.setUTCDate(this.today.getUTCDate() + diff);
  
    // Convertir targetDate en chaîne de date ISO pour la comparaison
    const targetDateString = targetDate.toISOString().split('T')[0];
  
    // Vérifier si la date formatée est dans l'historique de l'habitude
    return habit.history.some(historyDateString => {
      // Convertissez la chaîne de l'historique en un objet Date avant de l'utiliser
      const historyDateObject = new Date(historyDateString);
      // Ensuite, comparez les chaînes ISO des dates
      return historyDateObject.toISOString().split('T')[0] === targetDateString;
    });
  }
  
}