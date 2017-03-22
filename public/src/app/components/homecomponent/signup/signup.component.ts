import { Component, OnInit } from '@angular/core';
import {SignUp} from "./signup.interface";
import {AppService} from "../../../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
user:SignUp;
  constructor(private signUp:AppService,private router:Router) {
    this.user={
      firstname:"",
      lastname:"",
      email:"",
      mobile:undefined,
      pwd:"",
      gender:""
    }
   }
data;
  ngOnInit() {
  }


signupuser(user){
      this.signUp.url="http://localhost:3030/register";
    this.signUp.data = user;
    this.signUp.postService().subscribe(res=>{
      console.log(res);
        this.data = res["_body"];
        console.log(this.data);
       var  msg=JSON.parse(this.data);
     if(this.data==0){
           alert("User Already Existed")
          //  console.log("hjgghjkhikhikuyifu");
             this.router.navigate(["signup"]);
         }else if(this.data == 1){
            this.router.navigate(["signin"]);
             alert('Register Successfully');
         }

    });
  
}
}
