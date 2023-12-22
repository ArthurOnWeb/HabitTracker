import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  checkUsername: string = '';
  checkPasswordInput: string = '';

  constructor(private apiService: ApiService) {}

  createUser() {
    this.apiService.createUser(this.username, this.email, this.password).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }

  checkPassword() {
    this.apiService.checkPassword(this.checkUsername, this.checkPasswordInput).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }
}
