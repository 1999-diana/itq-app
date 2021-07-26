import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async register(
    nickname: string,
    email: string,
    password: string
  ): Promise<firebase.User> {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    const user: firebase.User = firebase.auth().currentUser;

    user.updateProfile({
      displayName: nickname,
    });
    firebase.database().ref(`users/${user.uid}`).set({
      nickname,
      email,
    });
    return user;
  }
  async login(email: string, password: string): Promise<firebase.User> {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const user: firebase.User = firebase.auth().currentUser;
    user.updateProfile({
      displayName: email,
    });
    return user;
  }

  stateUser = () =>
    new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(null);
        }
      });
    });
}
