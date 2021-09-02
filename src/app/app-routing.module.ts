import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { QuoteCreationComponent } from './quote-creation/quote-creation.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'quotes', component: HomeComponent},
  {path: 'create', component: QuoteCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
