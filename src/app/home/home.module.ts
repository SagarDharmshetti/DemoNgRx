import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HomePageRoutingModule,
    HttpClientModule,

  ],
  declarations: [HomePage],
})
export class HomePageModule {}

