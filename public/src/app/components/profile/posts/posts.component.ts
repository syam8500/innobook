import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  post : Post;
  getposts : any;
  constructor( private posts : AppService) {
    this.post = {
      text : '',
      email : 'shaik@gmail.com'
    }
    this.posts.url = 'http://localhost:3030/post';
  }

  ngOnInit() {
    this.posts.getService().subscribe(response => {
        this.getposts = response.json();
        console.log(this.getposts);
    });
  }
  func(data){
    console.log(data);
    this.posts.data = data;
    this.posts.postService().subscribe(response => {
      console.log(response);
    });
  }
}
export interface Post {
  text : string,
  email : string
}
