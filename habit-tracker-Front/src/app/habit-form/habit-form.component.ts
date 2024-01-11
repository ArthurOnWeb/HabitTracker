import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HabitService } from '../habit.service';
import { UserService } from '../user.service';
import { tap } from 'rxjs';
import { response } from 'express';
import { Router } from '@angular/router';
import { error } from 'console';
import { requireCheckboxesToBeCheckedValidator } from './require-chexboxes-to-be-checked.validator';


@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, ReactiveFormsModule], 
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent implements OnInit{

  nameHabit! : any;

  currentUserName! : any;

  form = new FormGroup({
    myInput: new FormControl('', [Validators.required]),
    // ...more form controls...

    
  });

  
  constructor(private habitService : HabitService, private userService: UserService, private router: Router){

  }

  ngOnInit(): void {
      this.currentUserName = this.userService.getUsername();
      
  }

  onSubmit(){


    
    const myInput = this.form.get('myInput');
    if(this.form.get('myInput') != null){
      this.nameHabit = myInput?.value;
    }
   
    this.habitService.createHabit(this.currentUserName, this.nameHabit).subscribe(
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
