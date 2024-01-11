import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HabitService } from '../habit.service';
import { UserService } from '../user.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Habit } from '../habit';

@Component({
  selector: 'app-update-habit',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './update-habit.component.html',
  styleUrl: './update-habit.component.css'
})
export class UpdateHabitComponent implements OnInit{

  currentUserName! : string | null;

  habit!: Habit
  
  form!: FormGroup;

  get myInput() {
    return this.form.get('myInput');
  }

  constructor(private habitService : HabitService, private userService: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){}

  ngOnInit(): void {

    this.currentUserName = localStorage.getItem('username')

    const habitId: string|null = this.route.snapshot.paramMap.get('id');
    if(habitId){
      this.habitService.getHabitById(habitId)
        .subscribe(
          habit =>{
            this.habit = habit
            this.form = this.fb.group({
              myInput: [this.habit.habitName, Validators.required]
            });
          } 
        );
    }

    


  }


 

  onSubmit(){


    const inputValue = this.myInput?.value;
    this.habit.habitName = inputValue;

    console.log(this.habit.habitName)

    const username = this.currentUserName ?? '';

    this.habitService.updateHabit(username, this.habit._id, this.habit.habitName).subscribe(
      (response: any) => {
        this.router.navigate(['/home-page']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
