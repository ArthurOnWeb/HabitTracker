import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string, confirmPassword: string) {
    return this.http.post(`${this.apiUrl}/createUser`, { username, password, confirmPassword });
  }
}
