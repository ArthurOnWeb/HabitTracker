import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private baseUrl = 'http://localhost:3000/api'; // Assure-toi de mettre le bon port si tu as changé le port du serveur

  constructor(private http: HttpClient) {}
  createHabit(username: string, habitName: string, frequency: string, duration: string, description: string): Observable<any> {
    const url = `${this.baseUrl}/createHabit/${username}`;
    const body = { habitName, frequency, duration, description };
    return this.http.post(url, body);
  }
  
  deleteHabit(habitId: string): Observable<any> {
    const url = `${this.baseUrl}/deleteHabit/${habitId}`;
    return this.http.delete(url);
  }
  getHabits(username:string): Observable<any>{
    const url = `${this.baseUrl}/getHabits/${username}`;
    return this.http.get(url);
  }
  addDateToHistory(habitId:string,date:string):Observable<any>{
    const url=`${this.baseUrl}/addDateToHistory/${habitId}`;
    const body = {date};
    return this.http.post(url,body);
  }
}