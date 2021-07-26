import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authServise: AuthService,
    private navCtrl: NavController
  ) {}
  async canActivate() {
    try {
      const user = await this.authServise.stateUser();
      if (user) {
        this.navCtrl.navigateRoot('/home');
      } else {
        return true;
      }
    } catch (error) {
      return true;
    }
  }
}
