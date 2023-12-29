import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {path: 'home-page', component:HomepageComponent},
    {path : 'sign-up', component:SignUpComponent},
    {path : 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch:'full'},
    
];
