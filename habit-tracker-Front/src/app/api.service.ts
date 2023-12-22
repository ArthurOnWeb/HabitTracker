import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // Assure-toi de mettre le bon port si tu as changé le port du serveur

  constructor(private http: HttpClient) {}

  createUser(username: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/createUser`;
    const body = { username, email, password };
    return this.http.post(url, body);
  }

  checkPassword(username: string, inputPassword: string): Observable<any> {
    const url = `${this.baseUrl}/checkPassword`;
    const body = { username, inputPassword };
    return this.http.post(url, body);
  }
  createHabit(username: string, habitName: string, frequency: string, duration: string, description: string): Observable<any> {
    const url = `${this.baseUrl}/createHabit/${username}`;
    const body = { habitName, frequency, duration, description };
    return this.http.post(url, body);
  }
}
