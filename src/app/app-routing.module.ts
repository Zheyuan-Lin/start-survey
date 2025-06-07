import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentComponent } from './consent/consent.component';
import { PreSurveyComponent } from './presurvey/presurvey.component';
import { ConsentGuard } from './guards/consent.guard';
import { PresurveyGuard } from './guards/presurvey.guard';

const routes: Routes = [
  { path: '', redirectTo: '/consent', pathMatch: 'full' },
  { path: 'consent', component: ConsentComponent, canActivate: [ConsentGuard] },
  { path: 'presurvey', component: PreSurveyComponent, canActivate: [PresurveyGuard] },
  { path: '**', redirectTo: '/consent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 