import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ForumComponent } from './forum';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: ForumComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
