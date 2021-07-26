import { Injectable } from '@angular/core';
import firebase  from 'firebase/app';
import 'firebase/database'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
db:firebase.database.Database
  constructor() { 
    this.db=firebase.database()
  }
  getUsers(){ 
    return this.db.ref('users')
}
getUser(uid){
return  new Promise((resolve,reject)=>{
this.db.ref(`user/${uid}`).on('value',(snapshot)=>{
  resolve({
    uid:snapshot.key,
    ...snapshot.val(),
  })
})
})
}

}
