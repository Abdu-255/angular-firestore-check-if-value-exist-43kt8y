import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule,  } from 'angularfire2';
import { Component } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { Subject } from 'rxjs/Subject';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCe1K2aUXEzx5oLTbFjcxDdkstOXGyb_iw",
      authDomain: "ignitedapp2017.firebaseapp.com",
      databaseURL: "https://ignitedapp2017.firebaseio.com",
      projectId: "ignitedapp2017",
      storageBucket: "",
      messagingSenderId: "242518444859"
    }),
  ],
  declarations: [AppComponent, UsersComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }