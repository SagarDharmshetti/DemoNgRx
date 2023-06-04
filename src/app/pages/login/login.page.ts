import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GetUserService } from 'src/app/services/userService/get-user.service';

import { Store } from '@ngrx/store';
import { hide, show } from '../../../store/loading/loading.action';
import { AppState } from 'src/store/AppState';
import { Subscription } from 'rxjs';
import {
  login,
  loginFail,
  loginSuccess,
} from '../../../store/login/login.action';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ToastController } from '@ionic/angular';

import { LoginState } from 'src/store/login/loginState';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  userData: any;

  loginStateSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: GetUserService,
    private store: Store<AppState>,
    private toastController: ToastController,
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  ngOnInit() {
    this.userService.getUserData().subscribe((res: any) => {
      localStorage.setItem('users', JSON.stringify(res.usersList));
    });

    this.loginStateSubscription = this.store
      .select('login')
      .subscribe((loginState) => {
        this.onIsLoggingIn(loginState);
        this.isLoggedIn(loginState);
        this.onError(loginState);
      });
  };

  public changeLanguage(event: any) {
    this.translateService.use(event.target.value);  
  };

  loginForm: any = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnDestroy(): void {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private onIsLoggingIn(loginState: LoginState) {
    if (loginState?.isLoggingIn) {
      this.store.dispatch(show());

      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.authService.login(email, password).subscribe(
        (user) => {
          this.store.dispatch(loginSuccess({ user, password }));
        },
        (error) => {
          this.store.dispatch(loginFail({ error }));
        }
      );
    }
  }

  private async isLoggedIn(loginState: LoginState) {
    if (loginState?.isLoggedIn) {
      const toastController = await this.toastController.create({
        message: 'Login Successful.',
        duration: 2000,
        color: 'success',
        position: 'bottom',
      });
      toastController.present();
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState?.error) {
      const toastController = await this.toastController.create({
        message: loginState.error.message,
        duration: 2000,
        color: 'danger',
        position: 'bottom',
      });
      toastController.present();
    }
  }

  onLogin() {
    this.store.dispatch(
      login({
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      })
    );

    setTimeout(() => {
      this.store.dispatch(hide());
      this.userData = JSON.parse(localStorage.getItem('users') || '');

      const result = this.userData.filter((ele: any) => {
        return (
          ele?.email === this.loginForm.controls.email.value &&
          ele?.password === this.loginForm.get('password').value
        );
      });

      if (result.length > 0) {
        this.router.navigate(['logged-in']);

        sessionStorage.setItem('loginUser', JSON.stringify(result));
      } else {
      }
      this.loginForm.reset();
    }, 3000);
  }

  forgotPassword() {
    this.store.dispatch(show());

    setTimeout(() => {
      this.store.dispatch(hide());
      this.router.navigate(['forgot-password']);
    }, 2000);
  }

  onHome() {
    this.router.navigate(['home']);
  }
}
