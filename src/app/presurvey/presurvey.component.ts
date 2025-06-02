import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-presurvey',
  template: `
    <div class="presurvey-container">
      <div class="content-wrapper">
        <div class="survey-section">
          <div class="header">
            <h2>Pre-Survey</h2>
            <div class="participant-id">
              <p>Your Participant ID:</p>
              <div class="id-container">
                <strong>{{userId}}</strong>
                <button class="copy-button" (click)="copyUserId()" [class.copied]="showCopied">
                  <i class="fa" [class.fa-check]="showCopied" [class.fa-copy]="!showCopied"></i>
                  {{showCopied ? 'Copied!' : 'Copy ID'}}
                </button>
              </div>
              <p class="id-note">Please copy this ID and paste it into the survey.</p>
            </div>
          </div>
          <div class="survey-frame">
            <iframe 
              [src]="surveyUrl" 
              frameborder="0"
              (load)="onIframeLoad($event)">
            </iframe>
          </div>
        </div>
        <div class="completion-section">
          <h3>Survey Completion</h3>
          <p>After completing the survey, enter the completion code:</p>
          <div class="code-input-container">
            <input 
              type="text" 
              [(ngModel)]="completionCode" 
              placeholder="Enter completion code"
              (keyup.enter)="submitCode()"
            >
            <button 
              (click)="submitCode()"
              [disabled]="!completionCode">
              Submit
            </button>
          </div>
          <p class="error-message" *ngIf="showError">Invalid completion code. Please try again.</p>
          <p class="help-text">Complete the survey first to get the completion code.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .presurvey-container {
      min-height: 100vh;
      background-color: #f5f7fa;
      padding: 20px;
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      height: calc(100vh - 40px);
    }

    .survey-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .header {
      padding: 20px;
      border-bottom: 1px solid #edf2f7;
    }

    h2 {
      color: #2d3748;
      margin: 0 0 20px 0;
      font-size: 24px;
      font-weight: 600;
    }

    .participant-id {
      background-color: #f8fafc;
      padding: 15px;
      border-radius: 8px;
    }

    .id-container {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 10px 0;
    }

    .participant-id strong {
      color: #3182ce;
      font-size: 18px;
      padding: 8px 12px;
      background-color: white;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }

    .copy-button {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background-color: white;
      color: #4a5568;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .copy-button:hover {
      background-color: #f7fafc;
      border-color: #3182ce;
      color: #3182ce;
    }

    .copy-button.copied {
      background-color: #48bb78;
      border-color: #48bb78;
      color: white;
    }

    .id-note {
      color: #718096;
      font-size: 14px;
      margin: 5px 0 0 0;
    }

    .survey-frame {
      flex: 1;
      overflow: hidden;
    }

    .survey-frame iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .completion-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      padding: 20px;
      display: flex;
      flex-direction: column;
    }

    .completion-section h3 {
      color: #2d3748;
      margin: 0 0 15px 0;
      font-size: 20px;
      font-weight: 600;
    }

    .completion-section p {
      color: #4a5568;
      margin: 0 0 15px 0;
      font-size: 15px;
      line-height: 1.5;
    }

    .code-input-container {
      display: flex;
      gap: 10px;
      margin: 10px 0;
    }

    .code-input-container input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 15px;
      transition: border-color 0.2s ease;
    }

    .code-input-container input:focus {
      outline: none;
      border-color: #3182ce;
    }

    .code-input-container button {
      padding: 10px 20px;
      background-color: #3182ce;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .code-input-container button:hover:not(:disabled) {
      background-color: #2c5282;
    }

    .code-input-container button:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }

    .error-message {
      color: #e53e3e;
      font-size: 14px;
      margin: 10px 0 0 0;
    }

    .help-text {
      color: #718096;
      font-size: 14px;
      font-style: italic;
      margin: auto 0 0 0;
    }

    @media (max-width: 1024px) {
      .content-wrapper {
        grid-template-columns: 1fr;
        height: auto;
      }

      .survey-section {
        height: 70vh;
      }

      .completion-section {
        margin-top: 20px;
      }
    }
  `]
})
export class PreSurveyComponent implements OnInit {
  private readonly SURVEY_URL = 'https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_72JuPQrWTnAq5FA';
  private readonly VALID_COMPLETION_CODE = '7azh8a';
  private readonly SITES = [
    'https://lumos-socratis-prompts-three.vercel.app/main',
    'https://lumos-socratis-prompts.vercel.app/main',
    'https://socratic-branch.vercel.app/main'
  ];

  userId: string = '';
  showCopied: boolean = false;
  surveyUrl: SafeResourceUrl;
  completionCode: string = '';
  showError: boolean = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.userId = this.generateUserId();
    this.surveyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.SURVEY_URL);
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  private generateUserId(): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `P${timestamp}${random}`;
  }

  copyUserId(): void {
    navigator.clipboard.writeText(this.userId).then(() => {
      this.showCopied = true;
      setTimeout(() => {
        this.showCopied = false;
      }, 2000);
    });
  }

  onIframeLoad(event: Event): void {
    // Handle iframe load event if needed
  }

  private getRandomSite(): string {
    const randomIndex = Math.floor(Math.random() * this.SITES.length);
    return this.SITES[randomIndex];
  }

  submitCode(): void {
    if (this.completionCode === '7azh8a') {
      const targetSite = this.getRandomSite();
      window.location.href = `${targetSite}?userId=${this.userId}`;
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    }
  }
} 