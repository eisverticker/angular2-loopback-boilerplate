import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';

//import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    data: {
      mode: 'login'
    }
  },
  {
    path: 'register',
    component: AuthComponent,
    data: {
      mode: 'register'
    }
  },
  {
    path: 'reset',
    component: AuthComponent,
    data: {
      mode: 'reset'
    }
  }
];

export const authRouting = RouterModule.forChild(routes);
