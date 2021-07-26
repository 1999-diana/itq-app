import { Component, OnInit } from '@angular/core';
import {MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private navCtrl:NavController,private menu:MenuController) { }

  ngOnInit() {
  }
gotoPage(page:string){
this.navCtrl.navigateRoot(`/menu/${page}`)
this.menu.close()
}
}
