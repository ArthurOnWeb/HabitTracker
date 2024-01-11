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
  habits!: Habit[]; 
  username: string | undefined; 
  today!: Date; 
  

  constructor(private habitService: HabitService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    
    this.getHabit();

    
    this.today = new Date(); 
    console.log(this.today)
  }

  getHabit() {
    
    this.username = localStorage.getItem('username') || '';

    
    this.habitService.getHabits(this.username).subscribe(
      (response : Habit[]) => {
        
        this.habits = response;
      },
      (error) => {
        
        console.error('Error retrieving habits:', error);
      }
    );
    }
  

    isTodayInHistory(habit : Habit): boolean {
      
      const formattedToday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());

      
      return habit.history.some(date => {
        
        const dateObject = date instanceof Date ? date : new Date(date);

        const formattedDate = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
        return formattedDate.getTime() === formattedToday.getTime();
      });
    }

  goToHabit(habit: Habit) {
    
    this.router.navigate(['/habit', habit._id])
  }
  
}