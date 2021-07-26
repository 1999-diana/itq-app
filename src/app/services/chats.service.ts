import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database'
import{Conversation} from'../_interfaces/Conversation'

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
db:firebase.database.Database;

  constructor() { 
    this.db=firebase.database();
  }
  async createChat(conversation:Conversation){
await this.db.ref(`chats/${conversation.uid}/${conversation.timestamp}`).set(conversation);

  }
  getChat(uid){
    return this.db.ref(`chats/${uid}`)
  }
}
