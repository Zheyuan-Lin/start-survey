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
            height="100%"
            style="border: none;"
            frameborder="0"
            scrolling="auto"
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
      height: 100vh;
      background-color: #f8fafc;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .header {
      background-color: #1a365d;
      color: white;
      padding: clamp(16px, 3vw, 24px) clamp(20px, 5vw, 40px);
      text-align: center;
      flex-shrink: 0;
    }

    .header h1 {
      margin: 0;
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 600;
    }

    .content-wrapper {
      flex: 1;
      padding: clamp(16px, 3vw, 24px) clamp(20px, 5vw, 40px);
      max-width: min(800px, 85vw);
      margin: 0 auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: clamp(16px, 3vw, 24px);
    }

    .pdf-viewer-container {
      flex: 1;
      background-color: #fff;
      border-radius: clamp(6px, 1vw, 8px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      position: relative;
      min-height: 0;
    }

    .pdf-viewer-container iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      /* Hide PDF toolbar and navigation */
      -webkit-filter: grayscale(0%);
      filter: grayscale(0%);
    }

    /* Hide PDF viewer toolbar and controls */
    .pdf-viewer-container iframe::-webkit-scrollbar {
      width: 8px;
    }

    .pdf-viewer-container iframe::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    .pdf-viewer-container iframe::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }

    .pdf-viewer-container iframe::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }

    .consent-footer {
      padding: clamp(16px, 3vw, 20px) 0;
      background-color: transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: clamp(16px, 3vw, 24px);
      flex-shrink: 0;
    }

    .consent-checkbox {
      display: flex;
      align-items: center;
      gap: clamp(8px, 2vw, 12px);
      flex: 1;
    }

    .consent-checkbox input[type="checkbox"] {
      width: clamp(18px, 4vw, 20px);
      height: clamp(18px, 4vw, 20px);
      border: 2px solid #cbd5e0;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .consent-checkbox input[type="checkbox"]:checked {
      background-color: #3182ce;
      border-color: #3182ce;
    }

    .consent-checkbox label {
      font-size: clamp(0.875rem, 2.5vw, 1rem);
      color: #4a5568;
      cursor: pointer;
      line-height: 1.4;
    }

    .continue-button {
      display: flex;
      align-items: center;
      gap: clamp(6px, 1.5vw, 8px);
      padding: clamp(10px, 2.5vw, 12px) clamp(20px, 4vw, 24px);
      background-color: #3182ce;
      color: white;
      border: none;
      border-radius: clamp(6px, 1.5vw, 8px);
      font-size: clamp(0.875rem, 2.5vw, 1rem);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      flex-shrink: 0;
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
      font-size: clamp(1.125rem, 3vw, 1.25rem);
      transition: transform 0.2s ease;
    }

    .continue-button:hover:not(:disabled) .arrow {
      transform: translateX(4px);
    }

    /* Tablet styles */
    @media (max-width: 1024px) {
      .content-wrapper {
        padding: clamp(12px, 2.5vw, 20px) clamp(16px, 4vw, 32px);
      }
    }

    /* Mobile styles */
    @media (max-width: 768px) {
      .consent-container {
        height: 100vh;
        overflow: hidden;
      }

      .content-wrapper {
        padding: clamp(12px, 2vw, 16px) clamp(12px, 3vw, 20px);
        gap: clamp(12px, 2.5vw, 20px);
      }

      .consent-footer {
        padding: clamp(12px, 2.5vw, 16px) 0;
        flex-direction: column;
        gap: clamp(12px, 2.5vw, 16px);
      }

      .consent-checkbox {
        width: 100%;
        justify-content: center;
      }

      .continue-button {
        width: 100%;
        justify-content: center;
        padding: clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px);
      }
    }

    /* Small mobile styles */
    @media (max-width: 480px) {
      .header {
        padding: clamp(12px, 2.5vw, 16px) clamp(12px, 3vw, 20px);
      }

      .content-wrapper {
        padding: clamp(8px, 2vw, 12px) clamp(8px, 2.5vw, 16px);
      }

      .pdf-viewer-container {
        border-radius: clamp(4px, 1vw, 6px);
      }
    }

    /* Landscape orientation adjustments */
    @media (orientation: landscape) and (max-height: 600px) {
      .header {
        padding: clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px);
      }

      .header h1 {
        font-size: clamp(1.25rem, 3vw, 1.5rem);
      }

      .content-wrapper {
        padding: clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px);
        gap: clamp(8px, 1.5vw, 12px);
      }

      .consent-footer {
        padding: clamp(8px, 1.5vw, 12px) 0;
      }
    }
  `]
})
export class ConsentComponent {
  accepted = false;
  pdfUrl = 'assets/consent-form.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0&view=FitH';

  constructor(private router: Router) {}

  onContinue() {
    if (this.accepted) {
      // Set consent status in session storage
      sessionStorage.setItem('hasConsented', 'true');
      this.router.navigate(['/presurvey']);
    }
  }
} 