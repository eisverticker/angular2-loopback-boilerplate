import { NgModule }       from '@angular/core';

//components
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form.component';
import { LogoutComponent } from './logout.component';
import { RegistrationFormComponent } from './registration-form.component';
import { ResetFormComponent } from './reset-form.component';
import { VerifyComponent } from './verify.component';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule }   from '@angular/router';
import { UtilityModule } from '../utilities/utility.module';
import { I18nModule } from '../i18n/i18n.module';

import { HttpModule } from '@angular/http';

//services
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';



//routing
import { authRouting } from './auth.routing';

@NgModule({
    declarations: [
      AuthComponent,
      LoginFormComponent,
      LogoutComponent,
      RegistrationFormComponent,
      ResetFormComponent,
      VerifyComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      UtilityModule,
      RouterModule,
      I18nModule,
      HttpModule,
      authRouting
    ],
    bootstrap:    [],
    providers: [
      AuthService,
      AuthGuardService
    ]
})
export class AuthModule {}
