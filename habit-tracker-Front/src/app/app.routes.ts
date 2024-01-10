import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomepageComponent } from './homepage/homepage.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OverallComponent } from './overall/overall.component';
import { HabitFormComponent } from './habit-form/habit-form.component';

export const routes: Routes = [
    {path: 'habit-form', component:HabitFormComponent},
    {path: 'weekly', component:WeeklyComponent},
    {path: 'home-page', component:HomepageComponent},
    {path : 'sign-up', component:SignUpComponent},
    {path : 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: '**', component:PagenotfoundComponent}
    
];
