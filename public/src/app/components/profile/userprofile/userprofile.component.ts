import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
getdetail;
  constructor(private profile:AppService,private router:Router) { }

  ngOnInit() {
    this.profile.url="http://localhost:3030/userprofile";
          this.profile.getService().subscribe(response => {
          this.getdetail = response.json();
  })
  }

}
