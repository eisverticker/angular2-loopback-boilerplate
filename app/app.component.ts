import { Component, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { NotificationService } from './utilities/notification.service';
import { Notification } from './utilities/notification';
import { AuthService } from './loopback-auth/auth.service';
import { User } from './loopback-auth/user';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit{
  public isAuthenticated: boolean = false;


  constructor(
    private translate: TranslateService,
    private notify: NotificationService,
    private toastr: ToastsManager,
    private auth: AuthService
  ){
    let supportedLanguages: string[] = [
      'de',
      'en',
      'ru'
    ];
    //- split the IETF language tag given by the user agent
    //- we only need the first part (e.g. 'en' from 'en-US')
    //  which probably a ISO-639-1 tag
    //- so we can keep it simple
    let browserLang: string = navigator.language.split('-')[0];

    //make sure to add the language codes of all supported languages
    let lang = supportedLanguages.indexOf(browserLang) === -1 ? 'en': browserLang;

     //the language to use
    translate.use(lang);

    //this language will be used as a fallback if a translation wasn't found in the current language
    translate.setDefaultLang('en');

  }

  ngOnInit(){
    this.notify.messages.subscribe(
      notification => {
        if(notification.tags.indexOf("success") !== -1){
          this.toastr.success(notification.message);
        }else if(
          notification.tags.indexOf("fail") !== -1 ||
          notification.tags.indexOf("error") !== -1)
        {
          this.toastr.error(notification.message);
        }else{
          this.toastr.info(notification.message);
        }
      }
    );

    this.auth.user.subscribe(
      user => {
        console.log("user", user);
        console.log("isGuest", User.isGuest(user));
        if(User.isGuest(user)){
          this.isAuthenticated = false;
          console.log("not auth");
        }else{
          this.isAuthenticated = true;
        }
      }
    );

  }


}
