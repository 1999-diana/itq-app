import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChatsService } from '../services/chats.service';
import { UsersService } from '../services/users.service';
import { Conversation } from '../_interfaces/Conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  friend;
  currentUser;
  chatId;
  conversations;
  conversation:Conversation= {} as Conversation;
  formConversation:FormGroup

  constructor(private route:ActivatedRoute,
    private userService:UsersService,
    private chatsService:ChatsService,
    private authService: AuthService,
    private  formBuilder: FormBuilder
    ) { }

  ngOnInit() {

    this.formConversation=this.formBuilder.group({
      message :['',[Validators.required]]
    })

this.route.params.subscribe(async(params) =>{
const { id }=params
this.friend=await this.userService.getUser(id)
this.currentUser=await this.authService.stateUser()
this.chatId=[this.friend.uid,this.currentUser.uid].sort().join('|')

this.chatsService.getChat(this.chatId).on('value',(snapshot)=>{
this.conversations=[]
snapshot.forEach((conversation)=>{
  this.conversations.push(conversation.val())

})
})
})
  }
async sendMessage(){
  if(this.formConversation.valid){
this.conversation.uid=this.chatId;
this.conversation.sender=this.currentUser.uid;
this.conversation.receiver=this.friend.uid;
this.conversation.text=this.formConversation.value.message;
this.conversation.timestamp=Date.now();

await this.chatsService.createChat(this.conversation);
this.formConversation.reset()
  }
}
  }

