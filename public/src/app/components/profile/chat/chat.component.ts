import { Component } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import {WindowRef} from './WindowRef';
import { AppService } from '../../../app.service';
import * as io from 'socket.io-client';
declare var jQuery: any;


class chatPopups {
constructor(
    public id:number,public name:string,public rpos:number) { }
}



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private url = 'http://localhost:3030';  
  private socket;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit() { 
      this.scrollToBottom();
  }

  ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  data:any;
  loggedinuser:any="user"+Math.floor((Math.random() * 100) + 1);
  flag:boolean=true;
  winWidth:number;
  allowedPopups:number;
  refObj:any;
  message
  activeUsers:any=[];

  chatPopups:any=[
    
  ];

  showChatPopups=[];
  rpos:number=0;

  constructor(private winRef: WindowRef,private _elfRef: ElementRef,private getDataService:AppService){
    this.populateData();
    this.refObj= this._elfRef.nativeElement;
    this.winWidth = this.winRef.nativeWindow.innerWidth;
    this.allowedPopups= Math.floor(this.winWidth/350);
    this.socket = io(this.url);
    console.log(this.loggedinuser);

    this.socket.on('msg', (data) => {
        
       if(data.user != this.loggedinuser){
         if(jQuery(this.refObj).find('#msg_body_'+data.id).length == 0){
            this.addChatPopup({'name':data.id}); 
            this.socket.emit('sendmsg', {message: data.msg, user: data.user,id: data.id});
         }
         else{
           jQuery(this.refObj).find('.msg_from').last().clone().text(data.msg).appendTo('#msg_body_'+data.id);
         }
       }
    });

  }

  populateData(){
    this.getDataService.data = "";
    this.getDataService.url = "http://localhost:3030/getData";
    this.getDataService.postService().subscribe(res =>{
     this.data =  JSON.parse(res["_body"]);
     this.data = this.data.data;
     for(var i=0;i<this.data.length;i++){
       if(this.data[i].logged == "true"){
          this.activeUsers.push({"name":this.data[i].firstName});
          this.socket.emit('joinChat', {id: this.data[i].firstName, user: this.data[i].firstName});   
        }
     }
      
    })
  }
  close(chat){

     for(var i = 0;i < this.chatPopups.length;i++){
       if(this.chatPopups[i].name == chat.name){
          this.chatPopups.splice(i,1);
       }
     }
     this.adjustRpos();
   
  }
  addChatPopup(name){
     this.flag=true;
     if(this.checkExists(name)){
        if(this.allowedPopups > this.chatPopups.length){

          this.rpos = this.rpos+300;
          this.chatPopups.push(new chatPopups(1,name.name,this.rpos));
          
        }
        else{
          this.chatPopups.pop();
          this.chatPopups.push(new chatPopups(1,name.name,this.rpos));
          this.adjustRpos();
        }        
      }


  }

  getStyle(name){
     return name.rpos+'px';
  }

  adjustRpos(){
       this.rpos=0;
      for(var i = 0;i < this.chatPopups.length;i++){
         this.rpos = this.rpos + 300;
         this.chatPopups[i].rpos =  this.rpos;
      }

   
  }
  checkExists(uname){
   
     for(var i = 0;i < this.chatPopups.length;i++){
       if(this.chatPopups[i].name == uname.name){
          this.flag=false;
          return this.flag;
       }
     }  
          return this.flag;   

  }


  onResize(event) {
    this.allowedPopups= Math.floor(event.target.innerWidth/350);
    if(event.target.innerWidth < 600){
      jQuery(this.refObj).find('.chat_box').hide();
      jQuery(this.refObj).find('.chat_popup').hide();
    }
    else{
      jQuery(this.refObj).find('.chat_box').show();
      jQuery(this.refObj).find('.chat_popup').show();

    }
    this.adjustDisplayedPopups();
  }

  adjustDisplayedPopups(){
    
    while(this.allowedPopups<this.chatPopups.length){
       this.chatPopups.pop();
    }
     this.adjustRpos();
  }

  toggleHead(){
      
      jQuery(this.refObj).find('.chat_body').slideToggle('slow');
  }

  toggleChatHead(user){
      
     jQuery(this.refObj).find('#msg_wrap_'+user.name).slideToggle('slow');
  }


  sendMsg(e,chatMsg){
    if (e.keyCode == 13){
       e.preventDefault();
       var msg = jQuery(this.refObj).find('#msg_input_'+chatMsg.name);
       if(msg.val() != '' && msg.val() && msg.val() != ' '){
          jQuery(this.refObj).find('.msg_to').last().clone().text(msg.val()).appendTo('#msg_body_'+chatMsg.name);
          this.message=msg.val();
          
          this.socket.emit('sendmsg', {message: this.message, user: this.loggedinuser,id: chatMsg.name});
       }
       msg.scrollTop(msg[0].scrollHeight);
       jQuery(this.refObj).find('#msg_input_'+chatMsg.name).val('');
       msg='';

    } 
  }
}
