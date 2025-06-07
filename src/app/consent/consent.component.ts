import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consent',
  template: `
    <div class="consent-container">
      <div class="header">
        <h1>Consent Form</h1>
      </div>
      
      <div class="content-wrapper">
        <div class="pdf-viewer-container">
          <iframe
            [src]="pdfUrl | safe"
            width="100%"
            height="700vh"
            style="border: none;"
          ></iframe>
        </div>

        <div class="consent-footer">
          <div class="consent-checkbox">
            <input type="checkbox" [(ngModel)]="accepted" id="consent-checkbox">
            <label for="consent-checkbox">I have read and agree to the terms of this study</label>
          </div>

          <button [disabled]="!accepted" (click)="onContinue()" class="continue-button">
            <span>Continue</span>
            <i class="arrow">→</i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .consent-container {
      min-height: 100vh;
      background-color: #f8fafc;
      display: flex;
      flex-direction: column;
    }

    .header {
      background-color: #1a365d;
      color: white;
      padding: 24px 40px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .content-wrapper {
      flex: 1;
      padding: 0 40px;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
    }

    .pdf-viewer-container {
      flex: 1;
      background-color: #fff;
      border-radius: 8px;
      margin-top: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .consent-footer {
      padding: 20px 0;
      background-color: transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
    }

    .consent-checkbox {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .consent-checkbox input[type="checkbox"] {
      width: 20px;
      height: 20px;
      border: 2px solid #cbd5e0;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .consent-checkbox input[type="checkbox"]:checked {
      background-color: #3182ce;
      border-color: #3182ce;
    }

    .consent-checkbox label {
      font-size: 1rem;
      color: #4a5568;
      cursor: pointer;
    }

    .continue-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background-color: #3182ce;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .continue-button:hover:not(:disabled) {
      background-color: #2c5282;
      transform: translateY(-1px);
    }

    .continue-button:disabled {
      background-color: #cbd5e0;
      cursor: not-allowed;
    }

    .arrow {
      font-size: 1.25rem;
      transition: transform 0.2s ease;
    }

    .continue-button:hover:not(:disabled) .arrow {
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .content-wrapper {
        padding: 0 20px;
      }

      .header {
        padding: 20px;
      }

      .header h1 {
        font-size: 1.75rem;
      }
    }

    @media (max-width: 640px) {
      .content-wrapper {
        padding: 0 16px;
      }

      .consent-footer {
        padding: 16px 0;
        flex-direction: column;
      }

      .consent-checkbox {
        width: 100%;
      }

      .continue-button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ConsentComponent {
  accepted = false;
  pdfUrl = 'assets/consent-form.pdf';

  constructor(private router: Router) {}

  onContinue() {
    if (this.accepted) {
      // Set consent status in session storage
      sessionStorage.setItem('hasConsented', 'true');
      this.router.navigate(['/presurvey']);
    }
  }
} 