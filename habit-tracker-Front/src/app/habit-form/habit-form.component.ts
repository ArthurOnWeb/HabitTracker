import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule], 
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent {
  days: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  nameHabit! : string;
  
  constructor(private habitService : HabitService){

  }

  


}
