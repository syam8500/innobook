import { Component, OnInit,OnChanges } from '@angular/core';
import { AppService } from '../../../app.service';
import{ActivatedRoute,Params} from "@angular/router";
@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit ,OnChanges{
 data :any[];
 data1:any;
 obj:any;
 dataObj:String;
  constructor(private profileService:AppService,  private _route:ActivatedRoute) {

  }
ngOnInit(){
   this._route.params.subscribe((params: Params) => {
       // let userId = params['userId'];
        console.log(params);
         this.data = JSON.parse(localStorage.getItem("key"));

         if(this.data!=null){

   this.obj =this.data[0];
   this.dataObj = this.obj["email"];
 console.log("asdfghjkl;");

   } console.log(this.data);
      });


}
addFriend(){
  console.log("mkdknjkjj")
 this.data1 = JSON.parse(localStorage.getItem("user"));
this.profileService.url="http://localhost:3030/userprofile/friend/58a6c2b7ebb09c1e80a21fec";
this.profileService.data ={"sender": this.data1["email"]  };
console.log(this.data1["email"]);
    this.profileService.postService().subscribe(res=>{
      console.log(res);
 this.data1 = res["_body"];

var msg=JSON.parse(this.data1)
if(msg.msg =="success")
alert("Request send...")

});
  }
  ngOnChanges() {
     console.log("asdfghjkl123;");
    console.log(this.data);
  }

}
