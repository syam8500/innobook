import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
password:SavePassword;
profile:ProfileData;
message:String = '';
saveProfile(){
  this._appService.url = 'http://localhost:3303/update/profile';
  this._appService.data = this.profile;
  this._appService.postService().subscribe(data => {
    this.message = JSON.parse(data["_body"]).message;
  })
}
ChangePassword(){
  this._appService.url = 'http://localhost:3303/update/password';
  this._appService.data = this.password;
  this._appService.postService().subscribe(data => {
    this.message = JSON.parse(data["_body"]).message;
  })
}

constructor(private _appService:AppService) { }

ngOnInit() {
    this.password= {
        CurrentPassword : '',
        NewPassword : '',
        ConformPassword :''
    }
    this._appService.url = 'http://localhost:3303/update/profile/prudhviraju29.mantena@gmail.com';
    this._appService.getService().subscribe(data => {
      console.log(JSON.parse(data["_body"]).data);
    this.profile = {
      firstName : JSON.parse(data["_body"]).data.firstName,
      lastName :JSON.parse(data["_body"]).data.lastName,
      Mobile :JSON.parse(data["_body"]).data.phone,
      Hobbies :JSON.parse(data["_body"]).data.hobbies,
      Description :JSON.parse(data["_body"]).data.description,
      Email:JSON.parse(data["_body"]).data.email,
      Dob :JSON.parse(data["_body"]).data.dob
    }
  })
  }

}

interface SavePassword{
    CurrentPassword: String,
    NewPassword: String,
    ConformPassword:String
}

interface ProfileData{
    firstName: String,
    lastName: String,
    Mobile:Number,
    Hobbies:String,
    Description:String,
    Email:String,
    Dob:Date
}