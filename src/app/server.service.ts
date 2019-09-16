import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

 @Injectable()
 export class ServerService{
    constructor(private http: HttpClient){

    }

    storeServers(servers: any[]){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        //return this.http.post('https://ng-http-start-d2b67.firebaseio.com/data.json', servers, {headers:headers});
        return this.http.put('https://ng-http-start-d2b67.firebaseio.com/data.json', servers, {headers:headers});
    }

    //getServers() : Observable<any> {
        //return this.http.get('https://ng-http-start-d2b67.firebaseio.com/data.json', {responseType: 'json'});

        
    //}
    
    getAppName(){
        return this.http.get('https://ng-http-start-d2b67.firebaseio.com/data/appName.json');
    }
 }