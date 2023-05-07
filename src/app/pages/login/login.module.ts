import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function loginTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/pages/login/', '.json');
}


@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: loginTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    })
  ],
  declarations: [LoginPage, ErrorMessageComponent],
})
export class LoginPageModule {}
