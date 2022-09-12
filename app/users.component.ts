import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AngularFireModule, } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface User {
  id?:    string;
  email:  string;
  gym:    string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {

  usersCollection:        AngularFirestoreCollection<User>;
  users:                  Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection =  this.afs.collection('users', (ref) => ref.orderBy('createdOn', 'desc'));
    //this.users =            this.usersCollection.valueChanges();
    this.users = this.usersCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as User;
        const id = action.payload.doc.id;
        return { 
          id,
          email: data.email,
          gym: data.gym
        }
      });
    });
  }

  ngOnInit() { }

  updateUser() {
    console.log('User (will be eventually) updated')
  }
  updateUserGym(id: string) {
    this.usersCollection.doc(`${id}`).update({ gym: 'Triumph' });
  }

}