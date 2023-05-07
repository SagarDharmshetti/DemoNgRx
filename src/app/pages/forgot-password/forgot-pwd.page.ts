import { AuthService } from './../../services/auth/auth.service';
import { LoginState } from './../../../store/login/loginState';
import {
  recoverPassword,
  recoverPasswordSuccess,
  recoverPasswordFail,
} from './../../../store/login/login.action';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { GetUserService } from 'src/app/services/userService/get-user.service';
import { passwordMissMatch } from 'src/app/validators/password.validator';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.page.html',
  styleUrls: ['./forgot-pwd.page.scss'],
})
export class ForgotPwdPage implements OnInit, OnDestroy {
  userData: any;
  showToaster: boolean = false;

  loginStateSubscription?: Subscription;

  constructor(
    private router: Router,
    private getUserService: GetUserService,
    private authService: AuthService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loginStateSubscription = this.store
      .select('login')
      .subscribe((loginState) => {
        this.onIsRecoveredPassword(loginState);
        this.onIsRecoveringPassword(loginState);
        this.onError(loginState);
      });
  }

  ngOnDestroy(): void {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  forgotForms: any = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,8}'
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,8}'
        ),
      ]),
    },
    [passwordMissMatch('password', 'confirmPassword')]
  );

  private onIsRecoveringPassword(loginState: LoginState) {
    if (loginState?.isRecoveringPassword) {
      this.store.dispatch(show());

      const email = this.forgotForms.get('email').value;

      this.authService.recovery(email).subscribe(
        (user) => {
          this.store.dispatch(recoverPasswordSuccess({ user }));
        },
        (error) => {
          this.store.dispatch(recoverPasswordFail({ error }));
        }
      );
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState?.isRecoveredPassword) {
      const toastController = await this.toastController.create({
        message: 'Password update Successful.',
        duration: 4000,
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
        duration: 4000,
        color: 'primary',
        position: 'bottom',
      });
      toastController.present();
    }
  }

  submit() {
    this.showToaster = false;

    this.store.dispatch(
      recoverPassword({
        email: this.forgotForms.get('email').value,
        password: this.forgotForms.get('Password').value,
      })
    );

    setTimeout(() => {
      this.store.dispatch(hide());

      this.userData = JSON.parse(localStorage.getItem('users') || '');

      this.userData.forEach((item: any) => {
        if (item.email === this.forgotForms.get('email')?.value) {
          this.showToaster = true;
          item.password = this.forgotForms.get('password')?.value;
        }
      });

      if (this.showToaster) {
        localStorage.setItem('users', JSON.stringify(this.userData));

        this.router.navigate(['login']);
      } else {

      }
      this.forgotForms.reset();
    }, 3000);
  }
}
