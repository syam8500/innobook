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
  ngOnChanges() {
     console.log("asdfghjkl123;");
    console.log(this.data);
  }

}
