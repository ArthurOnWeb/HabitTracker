import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitService } from '../habit.service';
import { Habit } from '../habit';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-habit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail-habit.component.html',
  styleUrl: './detail-habit.component.css'
})
export class DetailHabitComponent implements OnInit{

  habit!: Habit;
  date! : Date;
  currentDate!: string;
  errorMessage! : string;

  form!: FormGroup;

  get myInput() {
    return this.form.get('myInput');
  }
  
  constructor(private route: ActivatedRoute, private router: Router, private habitService: HabitService, private fb: FormBuilder){
    
  }

  ngOnInit(): void {
    const habitId: string|null = this.route.snapshot.paramMap.get('id');
    if(habitId){
      this.habitService.getHabitById(habitId)
        .subscribe(
          habit => this.habit = habit
          
        );
        
        
    }

    this.date = new Date();
    this.currentDate = this.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    this.form = this.fb.group({
      myInput: [this.currentDate, Validators.required]
    });
  
  }

  addDateToHabit(habitId: string,currentDate: Date): void {
    this.habitService.addDateToHistory(habitId, currentDate).subscribe(
      (response) => {
        
        console.log('Date added successfully', response);
        this.router.navigate(['/home-page'])
      },
      (error) => {
        
        console.error('Error adding date to habit:', error);
        this.errorMessage = "Error with add done date"
      }
    );
  }

  deleteHabit(){
    this.habitService.deleteHabit(this.habit._id)
      .subscribe(
        (response) => {
          console.log("Delete Success");
          this.router.navigate(['/home-page'])
        },
        (error) => {
          
          console.error('Error to delete habit:', error);
          
        }

      )
  }

  goToUpdateHabit(){
    this.router.navigate(['/update', this.habit._id])
  }

  onSubmit(){
    const inputValue = this.myInput?.value;
    this.currentDate = inputValue;
    const [day, month, year] = this.currentDate.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`)
    this.addDateToHabit(this.habit._id, formattedDate);
    

  }
  
  

}
