import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitService } from '../habit.service';
import { Habit } from '../habit';

@Component({
  selector: 'app-detail-habit',
  standalone: true,
  imports: [],
  templateUrl: './detail-habit.component.html',
  styleUrl: './detail-habit.component.css'
})
export class DetailHabitComponent implements OnInit{

  habit!: Habit;
  constructor(private route: ActivatedRoute, private router: Router, private habitService: HabitService){
    
  }

  ngOnInit(): void {
    const habitId: string|null = this.route.snapshot.paramMap.get('id');
    if(habitId){
      
    }
  }


}
