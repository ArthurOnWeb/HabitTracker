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
  constructor(private apiService: ApiService) {}

  createUser() {
    this.apiService.createUser('JohnDoe', 'john@example.com', 'securePassword').subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }

  checkPassword() {
    this.apiService.checkPassword('JohnDoe', 'securePassword').subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }
}
