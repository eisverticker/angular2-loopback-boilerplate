import { NgModule } from '@angular/core';
import {
  TranslateService,
  TranslatePipe,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate/ng2-translate';

import { Http } from '@angular/http';


@NgModule({
  imports:      [

  ],
  declarations: [
    TranslatePipe
  ],
  exports:      [
    TranslatePipe
  ],
  providers: [
    TranslateService,
    {
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'web/locale', '.json'),
      deps: [Http]
    }
  ]
})
export class I18nModule {

}
