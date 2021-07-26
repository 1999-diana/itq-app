import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private storage:Storage,private navCtrl:NavController){}
  async canActivate(){
    const isIntroShowed =await this.storage.get('isIntroShowed')
    console.log(isIntroShowed)
    if(isIntroShowed){
      return isIntroShowed
    }else{
    this.navCtrl.navigateRoot('/intro')
    }
  }
  }
  

