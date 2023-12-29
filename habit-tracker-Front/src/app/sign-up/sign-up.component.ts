import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username ="";
  password = "";
  confirmPassword ="";
  errorMessage ="";

  constructor(private userService: UserService, private router: Router){}



  register(){

    this.errorMessage = "";
    this.userService.register(this.username, this.password, this.confirmPassword)
      .subscribe(
        (response: any) => {
          console.log('User registered successfully');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/homepage'])
        },
        (error) => {
          console.log("Username : ",this.username)
          console.log("Password : ", this.password)
          console.error('Registration failed:', error);
          if(this.username==="" || this.password==="" || this.confirmPassword===""){
            this.errorMessage = "You must fill all input"
          }
          else{
            this.errorMessage = error.error.error;
          }
          
          // Gérer les erreurs d'inscription ici (affichage d'un message d'erreur, etc.)
        }
      );
  }
}

