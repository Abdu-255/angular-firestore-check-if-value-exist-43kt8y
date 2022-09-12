import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
        FormBuilder,
        FormGroup,
        AbstractControl
        } from '@angular/forms';
import { AngularFireModule, } from 'angularfire2';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface User {
  id?: string;
  email: string;
  gym: string;
}

export interface UserInvite {
  id?: string;
  email: string;
  gym: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  usersCollection:        AngularFirestoreCollection<User>;
  users:                  Observable<User[]>;
  userInvitesCollection:  AngularFirestoreCollection<UserInvite>;
  userInviteForm:         FormGroup;
  value:                  Observable<UserInvite[]>;

  constructor(private afs: AngularFirestore,fb: FormBuilder) {
    this.userInvitesCollection = this.afs.collection('userInvites', (ref) => ref.orderBy('createdOn'));

    this.userInviteForm = fb.group({
      'email': [''],
      'gym': [''],
    });
  }

  ngOnInit() { }

  checkeUserInvite(value: any) {
    this.usersCollection = this.afs.collection('users', ref => ref.where('email', '==', this.userInviteForm.value.email))
    this.users = this.usersCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as User;
        //const id = action.payload.doc.id;
        return { 
          id: action.payload.doc.id,
          email: data.email,
          gym: data.gym
        }
      });
    });

    this.users.subscribe(snapshot => {
      if(snapshot.length == 0) {  
        console.log('Email match NOT found')
        this.createUserInvite(value);
      } else {
        console.log('Email match found for user' + snapshot[0].id )
        this.updateUserGym(snapshot[0].id)
      }
    })
  }

  createUserInvite(value: any) {
    console.log('User invite created')
    console.log(value)
    const userInviteValues: any = {
      'email': value.email,
      'gym': value.gym,
      'status': 'invited'
    }
    return this.userInvitesCollection.add(userInviteValues);
  }

  updateUserGym(id: string) {
    console.log('User `${id}` gym updated')
    this.usersCollection.doc(`${id}`).update({ gym: 'Test Triumph' });
  }

}


/*** Steps for updating a specific user.gym
 * 1. Get ID of document that matches where clause. (list all users with thier ID next to them using gitter method)
 * 2. Pass ID into updateUser method (Pass in both user.id and gym value)
 * 3. Perform update for specified ID
 */