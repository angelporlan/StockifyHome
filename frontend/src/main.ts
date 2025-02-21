import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const translateProviders = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
}).providers;

const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    ...(translateProviders || []), 
  ],
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .then(appRef => {
    const translate = appRef.injector.get(TranslateService);
    translate.setDefaultLang('es');
    translate.use('es');
  })
  .catch(err => console.error(err));



