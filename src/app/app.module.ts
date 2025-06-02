import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ConsentComponent } from './consent/consent.component';
import { PreSurveyComponent } from './presurvey/presurvey.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConsentComponent,
    PreSurveyComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/consent', pathMatch: 'full' },
      { path: 'consent', component: ConsentComponent },
      { path: 'presurvey', component: PreSurveyComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 