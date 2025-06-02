import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  /* ... */
  imports: [
    RouterModule.forRoot(appRoutes)
    /* ... */
  ],
  /* ... */
})