import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresurveyGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if consent was given
    const hasConsented = sessionStorage.getItem('hasConsented') === 'true';
    
    if (!hasConsented) {
      // If consent was not given, redirect to consent
      this.router.navigate(['/consent']);
      return false;
    }
    
    return true;
  }
} 