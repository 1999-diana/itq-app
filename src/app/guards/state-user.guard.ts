
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class StateUserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async canActivate() {
    try {
      const user = await this.authService.stateUser();
      if (user) {
        return true;
      } else {
        this.navCtrl.navigateRoot('/login');
      }
    } catch (error) {
      this.navCtrl.navigateRoot('/login');
    }
  }
}