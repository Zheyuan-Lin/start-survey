# Survey Consent App

A simple Angular application that handles user consent and pre-survey functionality.

## Features

- Consent form with checkbox agreement
- Pre-survey with embedded Qualtrics survey
- Participant ID generation and management
- Survey completion code verification
- Random site redirection after survey completion

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
ng serve
```

3. Navigate to `http://localhost:4200` in your browser.

## Configuration

The following values can be configured in the `PreSurveyComponent`:

- `SURVEY_URL`: The URL of the Qualtrics survey
- `VALID_COMPLETION_CODE`: The code required to complete the survey
- `SITES`: Array of URLs for random redirection after survey completion

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 