import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent implements OnInit {
  private userId: string;

  constructor(private router: Router) {
    this.userId = this.generateUserId();
  }

  ngOnInit(): void {
    // No localStorage, just generate and use userId as needed
  }

  private generateUserId(): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `P${timestamp}${random}`;
  }
} 