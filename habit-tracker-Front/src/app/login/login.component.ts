import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginObj: any = {
    username : '',
    password: ''
  };

  constructor(private apiService: ApiService) {}
  
  // createUser() {
  //   this.apiService.createUser(this.username, this.email, this.password).subscribe(
  //     response => console.log(response),
  //     error => console.error(error)
  //   );
  // }

  

  checkPassword() {
    this.apiService.checkPassword(this.loginObj.username, this.loginObj.password).subscribe(
      response => {
        console.log(response);
        document.cookie = `token=${response.token}; path=/`; // Utilise le nom de cookie et le token que tu reçois du serveur
      },
      error => console.error(error)
    );
  }
}
