import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/windowRef/window.service';
import * as firebase from 'firebase/compat/app';
import * as firebases from 'firebase/app' 
import { RecaptchaVerifier, getAuth } from "firebase/auth"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export class PhoneNumber {
  country!: string;
  area: string | undefined;
  prefix: string | undefined;
  line: string | undefined;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public windowRef: any;
  public phoneNumber = new PhoneNumber();
  public verificationCode: string | undefined;
  public user: any;

  constructor(
    private win: WindowService,
    private auth: AngularFireAuth,
  ) {}

  ngOnInit() {
    this.windowRef = this.win.windowRef;

    const auth = getAuth();


    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container' , {
      'size': 'invisible',
      'callback': (response:any) => {
        console.log(response);
      }
    }, auth);


    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response:any) => {
        console.log(response);
      }
    }, auth);


    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;

    this.auth.signInWithPhoneNumber(num, appVerifier)
        .then(result => {
          this.windowRef.confirmationResult = result;
        })
        .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
        .confirm(this.verificationCode)
        .then( (result: { user: any; }) => {
          this.user = result.user;
        })
        .catch( (error: any) => console.log(error, 'Incorrect code entered?'));
  }

}
