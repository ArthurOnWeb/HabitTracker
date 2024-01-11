import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { error } from 'console';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard  implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router
    ){

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.getLoggedIn().pipe(
          tap((loggedIn: boolean) => {
            if (!loggedIn) {
              // If the user is not logged in, navigate to the login page (or any other desired route)
              this.router.navigate(['/login']);
            }
          })
        );
      }
};
