import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshPreventionService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private isNavigating = false;
  private sessionKey = 'app_session_active';

  constructor(private router: Router) {
    this.initializeService();
  }

  private initializeService() {
    // Track navigation events
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isNavigating = false;
        this.setSessionActive();
      });

    // Listen for beforeunload event (refresh, close tab, navigate away)
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));

    // Listen for page load to detect refresh
    window.addEventListener('load', this.handlePageLoad.bind(this));

    // Detect back/forward navigation
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  private handleBeforeUnload(event: BeforeUnloadEvent) {
    // Only show warning if not navigating within the app
    if (!this.isNavigating) {
      const message = 'Are you sure you want to leave? Your progress may be lost.';
      event.preventDefault();
      event.returnValue = message;
      return message;
    }
    return undefined;
  }

  private handlePageLoad() {
    // Check if this is a page refresh
    if (this.wasPageRefreshed()) {
      this.handleRefreshDetected();
    }
  }

  private handlePopState(event: PopStateEvent) {
    // Handle browser back/forward buttons
    console.log('Back/Forward navigation detected');
    // You can implement custom logic here
  }

  private wasPageRefreshed(): boolean {
    // Method 1: Check navigation type
    if (performance.navigation.type === 1) {
      return true;
    }

    // Method 2: Check if session was active
    const wasActive = sessionStorage.getItem(this.sessionKey);
    return wasActive === 'true';
  }

  private handleRefreshDetected() {
    console.log('Page refresh detected');
    // Clear session data
    sessionStorage.removeItem(this.sessionKey);
    // Redirect to consent page
    this.router.navigate(['/consent']);
  }

  private setSessionActive() {
    sessionStorage.setItem(this.sessionKey, 'true');
  }

  public setNavigating(value: boolean) {
    this.isNavigating = value;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    window.removeEventListener('load', this.handlePageLoad.bind(this));
    window.removeEventListener('popstate', this.handlePopState.bind(this));
  }
} 