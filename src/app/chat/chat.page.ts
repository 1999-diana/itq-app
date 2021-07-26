import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
users=[];
currentUser=null

  constructor(private userService:UsersService,
    private authService:AuthService,
    private navCtrl:NavController
    ) { }

  async ngOnInit() {
    this.currentUser=await this.authService.stateUser()
this.userService.getUsers().on('value',(snapshot)=>{
  this.users=[]
snapshot.forEach((user)=>{

this.users.push({
  uid:user.key,
  ...user.val()
})
})
})
  }
  goToConversation(uid){
this.navCtrl.navigateForward(['menu','chat','conversation',uid])
  }

}
