import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import {Router} from "@angular/router";
import {SignIn} from "./signin.interface";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
user:SignIn;
data:any;
isTrue :boolean;
  constructor( private signinService:AppService,private router:Router) {
    this.user ={
      email:"",
      pwd:""
    }
   }

  ngOnInit() {
  }

signinuser(user){
this.signinService.data = user;
this.signinService.url = "http://localhost:3030/login";
this.signinService.postService().subscribe(res =>{
 this.data =  JSON.parse(res["_body"]);
 if(this.data["success"]=="sucess"){
   this.router.navigate(["profile"]);
 }
 else{
   this.isTrue = true;
  this.router.navigate(["signin"]); 
 }
})
}
}
