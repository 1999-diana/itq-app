import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';
import { StateUserGuard } from './guards/state-user.guard';
//import { StateUserGuard } from './guards/state-user.guards';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    canActivate:[IntroGuard,StateUserGuard],
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then((m)  => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( (m) => m.LoginPageModule),
    canActivate:[IntroGuard,AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( (m) => m.RegisterPageModule),
    canActivate:[IntroGuard,AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
