import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  username: string = localStorage.getItem('username') || '';
  
  constructor(private authService: AuthService,private router :Router) {}
  
  ngOnInit() {
    this.authService.getLoggedIn().subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.authService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}