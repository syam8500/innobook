import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import {Router,ActivatedRoute} from "@angular/router";
import { Typeahead } from 'ng2-typeahead';
import {DataToLowerCase} from "./header.interface";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data1:any;
  
public data :DataToLowerCase[];
 dataObj:any[];
 result:any[];
 userId:Number;
public selected:any ;
public firstName: string;
  public Selected(selected) {
    this.selected =selected;
    console.log(selected);
    console.log("hai");
    this.firstName = selected ? selected.firstName : 'none';

  }
  constructor( private searchService:AppService ,private router:Router,  private _route:ActivatedRoute,private signoutService:AppService) {
   
    this.data =[{
      email:'',
      firstName:""
    }];
        this.searchService.url="http://localhost:3030/userprofile/58a6c2b7ebb09c1e80a21fec";
        this.data1 = JSON.parse(localStorage.getItem("user"));
this.searchService.data = {"username": this.data1["email"]};
    this.searchService.postService().subscribe(res=>{
      console.log("hareesh resopnse");
      console.log(res);
//  this.data = res["_body"];
// var msg=JSON.parse(this.data);
// if(msg.msg =="success")
// alert("Request send...")

});

   }
findFriend(){
  console.log(this.selected)
 console.log("hai");

 this.searchService.data = this.selected;
  this.searchService.url = 'http://localhost:3030/search/58ab272364816912f459e70b';
//   (this.dataObj).filter(selected =>{
//  return selected["email"] == this.selected["email"]
//   }
//   )
  this.searchService.postService().subscribe(res =>{
   let  userId =this.selected["firstName"];
    this.result = res.json();
    if(this.result["mgs"]=="success"){
    this.searchService.profileData =this.result["data"];
    localStorage.setItem("key",JSON.stringify(this.searchService.profileData));
    console.log(this.router);
    //this.router.navigate(["profile"]);
  this.router.navigate(["profile/friendprofile",userId]);
    console.log(this.result) ;

 }}
 );
}
 ngOnInit() {
      this.searchService.url = 'http://localhost:3030';
      this.searchService.getService().subscribe(res => {this.dataObj =res.json()
      console.log(this.dataObj);
      (this.dataObj).forEach(element => {
        var x = element.firstName;
        if(x!=undefined){
console.log(x.toLowerCase());
this.data.push({
  email:element.email,
  firstName:x
});}
      });
     this.selected = this.data[0];});


  }
   acceptRequest(){


this.searchService.url="http://localhost:3030/userprofile/accept_request/58a6c2b7ebb09c1e80a21fec";

    this.searchService.postService().subscribe(res=>{
      console.log(res);
//  this.data = res["_body"];
// var msg=JSON.parse(this.data);
// if(msg.msg =="success")
// alert("Request send...")

    } )


 }


  logOut(){
    
    this.signoutService.data = "";
    this.signoutService.url = "http://localhost:3030/logOut/"+JSON.parse(localStorage.getItem('user')).email;
     this.signoutService.postService().subscribe(res =>{
      this.data =  JSON.parse(res["_body"]);
      if(this.data["success"]=="sucess"){
         this.searchService.logout();
         console.log('logout()');
         this.router.navigate(["signin"]);

      }
      else{
       
       this.router.navigate(["profile"]);
     }


     })
    
    
  }

}
