import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomepageComponent } from './homepage/homepage.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OverallComponent } from './overall/overall.component';
import { HabitFormComponent } from './habit-form/habit-form.component';
import path from 'path';
import { DetailHabitComponent } from './detail-habit/detail-habit.component';
import { UpdateHabitComponent } from './update-habit/update-habit.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [


    {path: 'update/:id', component:UpdateHabitComponent, canActivate: [AuthGuard]},
    {path: 'habit/:id', component:DetailHabitComponent, canActivate: [AuthGuard]},
    {path: 'habit-form', component:HabitFormComponent, canActivate: [AuthGuard]},
    {path: 'weekly', component:WeeklyComponent, canActivate: [AuthGuard]},
    {path: 'home-page', component:HomepageComponent, canActivate: [AuthGuard]},
    {path : 'sign-up', component:SignUpComponent},
    {path : 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: '**', component:PagenotfoundComponent}
    
];
