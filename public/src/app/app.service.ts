import {Injectable}from "@angular/core";
import {Http,Response,Headers} from "@angular/http";
import 'rxjs/add/operator/map';
@Injectable()
export class AppService{
    url:string;
    data:any={'success':'',error:''};
profileData:any[];
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
return this._http.post(this.url,this.data,{headers:headers}).map(res=>res);
}
checkUser(){
    var  headers = new Headers;
    var user = localStorage.getItem("value");
     headers.append('Content-Type','application/json; charset=utf-8');
     return this._http.get('http://localhost:3030/check/'+user,{headers:headers}).map(res=>res);
}
}
