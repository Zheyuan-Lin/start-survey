import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consent',
  template: `
    <div class="consent-container">
      <div class="consent-content">
        <div class="header">
          <h1>Consent Form</h1>
          <p class="subtitle">Thank you for participating in our study. Please read the following consent form carefully.</p>
        </div>

        <div class="consent-text">
          <p class="intro">You are being asked to be in a research study. This form is designed to tell you everything you need to think about before you decide to consent (agree) to be in the study or not to be in the study. It is entirely your choice. If you decide to take part, you can change your mind later on and withdraw from the research study. You can skip any questions that you do not wish to answer.</p>
          
          <div class="section">
            <h3>Before making your decision:</h3>
            <ul>
              <li>Please carefully read this form or have it read to you</li>
              <li>Please ask questions about anything that is not clear</li>
            </ul>
          </div>

          <div class="section">
            <h3>Study Overview</h3>
            <p>The purpose of this study is to observe decisions that subjects make using data presented in a visualization interface.</p>
          </div>

          <div class="section">
            <h3>Procedures</h3>
            <p>In this study, you will be asked to:</p>
            <ul>
              <li>Complete a pre-survey</li>
              <li>Interact with data visualizations</li>
              <li>Answer questions about the visualizations</li>
              <li>Complete a post-survey</li>
            </ul>
          </div>

          <div class="section">
            <h3>Risks and Benefits</h3>
            <p>We do not anticipate any risks greater than those involved in daily activities such as using a computer. This study is designed to learn more about how people interact with data visualizations.</p>
          </div>

          <div class="section">
            <h3>Confidentiality</h3>
            <p>Your responses will be kept confidential and will only be used for research purposes. Your personal information will not be shared with any third parties.</p>
          </div>
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
      padding: 40px 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .consent-content {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      overflow: hidden;
    }

    .header {
      background-color: #1a365d;
      color: white;
      padding: 40px;
      text-align: center;
    }

    h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.025em;
    }

    .subtitle {
      margin: 16px 0 0;
      font-size: 1.125rem;
      opacity: 0.9;
    }

    .consent-text {
      padding: 40px;
      color: #2d3748;
      line-height: 1.7;
    }

    .intro {
      font-size: 1.125rem;
      margin-bottom: 32px;
      color: #4a5568;
    }

    .section {
      margin-bottom: 32px;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    h3 {
      color: #1a365d;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 16px;
    }

    ul {
      margin: 0;
      padding-left: 24px;
    }

    li {
      margin-bottom: 12px;
      color: #4a5568;
    }

    li:last-child {
      margin-bottom: 0;
    }

    .consent-footer {
      padding: 32px 40px;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
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

    @media (max-width: 640px) {
      .consent-container {
        padding: 20px 16px;
      }

      .header {
        padding: 32px 24px;
      }

      h1 {
        font-size: 2rem;
      }

      .consent-text {
        padding: 24px;
      }

      .consent-footer {
        padding: 24px;
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

  constructor(private router: Router) {}

  onContinue() {
    if (this.accepted) {
      this.router.navigate(['/presurvey']);
    }
  }
} 