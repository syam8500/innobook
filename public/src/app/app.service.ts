import {Injectable}from "@angular/core";
import {Http,Response,Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class AppService{
    url:string;
    data:any={'success':'',error:''};
profileData:any[];
  authToken;
    user;
constructor(private _http:Http){


}
getService(){
    var  headers = new Headers;
     headers.append('Content-Type','application/json; charset=utf-8');
return this._http.get(this.url,{headers:headers}).map(res=>res);
}
postService(){
      var  headers = new Headers;
     headers.append('Content-Type','application/json; charset=utf-8');
     console.log(this.data);
return this._http.post(this.url,this.data,{headers:headers}).map(res=>res);
}
checkUser(){
    var  headers = new Headers;
    var user = localStorage.getItem("value");
     headers.append('Content-Type','application/json; charset=utf-8');
     return this._http.get('http://localhost:3030/check/'+user,{headers:headers}).map(res=>res);
}
storeUserdata(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  logout(){
     this.authToken=null;
     this.user=null;
     localStorage.clear();
  }
 loggedIn(){
    return tokenNotExpired();
 }
  private caseNumber = new Subject<any>();
  caseNumber$ = this.caseNumber.asObservable();
    publishData(Data) {
    console.log(Data);
     console.log("%%%%%%%%%%%%%");
    this.caseNumber.next(Data);
  }
}

