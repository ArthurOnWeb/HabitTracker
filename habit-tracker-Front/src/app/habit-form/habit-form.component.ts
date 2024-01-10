import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HabitService } from '../habit.service';
import { UserService } from '../user.service';
import { tap } from 'rxjs';
import { response } from 'express';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule], 
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent implements OnInit{
  days: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  nameHabit! : string;

  currentUserName! : any;

  
  constructor(private habitService : HabitService, private userService: UserService, private router: Router){

  }

  ngOnInit(): void {
      this.currentUserName = this.userService.getUsername();
  }

  onSubmit(){
  
    this.habitService.createHabit(this.currentUserName, this.nameHabit, "3 fois", "10 jours", "hifendj").subscribe(
      (response : any) => {
        this.router.navigate(['/home-page']);
      }
      ,
      (error : any) => {
        console.log(error)
      }
    );
  }

  


}
