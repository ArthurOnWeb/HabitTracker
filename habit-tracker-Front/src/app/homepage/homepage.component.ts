import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HabitService } from '../habit.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { UserService } from '../user.service';
import { Habit } from '../habit';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent,CommonModule, NgFor, NgIf],
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  habits!: Habit[]; // Define a property to store the retrieved habits
  username: string | undefined; // Define a property to store the username
  today!: Date; // Define a property to store today's date
  done!: number;

  constructor(private habitService: HabitService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Appel de la fonction getHabit lors de l'initialisation du composant
    this.getHabit();

    // Définir la date d'aujourd'hui au 11 janvier 2024
    this.today = new Date();; // Assurez-vous que le fuseau horaire est correct
    console.log(this.today)
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
  

    isTodayInHistory(habit : Habit): boolean {
      // Formater la date actuelle pour correspondre au format de votre array history
      const formattedToday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());

      // Vérifier si la date actuelle est incluse dans l'array history
      return habit.history.some(date => {
        // Vérifier si date est un objet Date
        const dateObject = date instanceof Date ? date : new Date(date);

        const formattedDate = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
        return formattedDate.getTime() === formattedToday.getTime();
      });
    }

  goToHabit(habit: Habit) {
    
    this.router.navigate(['/habit', habit._id])
  }
  
}