import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsentComponent } from './consent/consent.component';
import { PreSurveyComponent } from './presurvey/presurvey.component';
import { SafePipe } from './safe.pipe';
import { RefreshPreventionService } from './services/refresh-prevention.service';
import { PresurveyRouteReuseStrategy } from './presurvey/presurvey-route-reuse-strategy';
import { RouteReuseStrategy } from '@angular/router';

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
    NgxExtendedPdfViewerModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/consent', pathMatch: 'full' },
      { path: 'consent', component: ConsentComponent },
      { path: 'presurvey', component: PreSurveyComponent }
    ])
  ],
  providers: [
    RefreshPreventionService,
    { provide: RouteReuseStrategy, useClass: PresurveyRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 