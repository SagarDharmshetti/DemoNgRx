import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AuthGuard } from './guards/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'logged-in',
    loadChildren: () =>
      import('./pages/logged-in/logged-in.module').then(
        (m) => m.LoggedInPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-pwd.module').then(
        (m) => m.ForgotPwdPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule)
  },
  {
    path: 'error',
    component: ErrorMessageComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
