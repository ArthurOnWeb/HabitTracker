import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn = new BehaviorSubject<boolean>(false);

    constructor() {
        this.checkInitialLoginState();
      }
      private checkInitialLoginState() {
        const token = localStorage.getItem('token');
        this.isLoggedIn.next(!!token);
      }
      

    // Appeler cette méthode pour changer l'état de connexion
    setLoggedIn(value: boolean) {
        this.isLoggedIn.next(value);
    }

    // Observable pour accéder à l'état de connexion
    getLoggedIn(): Observable<boolean> {
        return this.isLoggedIn.asObservable();
    }
}
  