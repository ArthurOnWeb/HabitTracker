import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  
})
export class LoginComponent {
  
  username = "";
  password = "";
  errorMessage! : string;

  constructor(private userService: UserService, private router: Router) {}
  
  // createUser() {
  //   this.apiService.createUser(this.username, this.email, this.password).subscribe(
  //     response => console.log(response),
  //     error => console.error(error)
  //   );
  // }

  

  login(): void {
    this.userService.login(this.username, this.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home-page']);

        },
        (error) => {
          console.error('Login failed:', error);
          
          
          this.errorMessage = "Username or password is incorrect";
          console.log(this.errorMessage)
        }
      );
  }
}
