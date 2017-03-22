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
  constructor( private searchService:AppService ,private router:Router,  private _route:ActivatedRoute) {
    this.data =[{
      email:'',
      firstName:""
    }]
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

}
