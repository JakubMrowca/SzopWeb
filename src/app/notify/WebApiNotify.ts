import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import { UserVm } from '../vm/userVm';
// import { AddPhotoForEmployerCommand } from '../../employer/commands/AddPhotoForEmployerCommand';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class WebApiNotify{
    constructor(private http: HttpClient){

    }
    getNotify(): Observable<Array<any>>{
        return this.http.get<Array<any>>(environment.apiUrl +"n/notify",httpOptions)
    }
}