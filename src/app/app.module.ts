import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GetUserService } from './services/userService/get-user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStoreModule } from 'src/store/AppStoreModule';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingComponent } from './components/loading/loading.component';
import { AuthService } from './services/auth/auth.service';

import { EffectsModule } from '@ngrx/effects';
import { effects } from './effects';
import { catalogEffects } from '../store/userData/effects/index';
import { LoggedInPageModule } from './pages/logged-in/logged-in.module';
import { HomePageModule } from './home/home.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { WindowService } from './services/windowRef/window.service';


@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ...AppStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(effects),
    EffectsModule.forRoot(catalogEffects),
    HttpClientModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    GetUserService,
    AuthService,
    WindowService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
