import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConsentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if consent was given
    const hasConsented = sessionStorage.getItem('hasConsented') === 'true';
    
    if (hasConsented) {
      // If consent was given, redirect to presurvey
      this.router.navigate(['/presurvey']);
      return false;
    }
    
    return true;
  }
} 