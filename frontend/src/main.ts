import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthStore } from './app/store/auth.store';

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
    const authStore = appRef.injector.get(AuthStore);
    translate.setDefaultLang(authStore.languagePreference() || 'es');
    translate.use(authStore.languagePreference() || 'es');
  })
  .catch(err => console.error(err));



