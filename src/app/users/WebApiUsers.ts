import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticateUserCommand } from './commands/AuthenticateUserCommand';
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
export class WebApiUsers{
    constructor(private http: HttpClient){

    }

    authorizeuser(command:AuthenticateUserCommand): Observable<any>{
        return this.http.post<any>(environment.apiUrl +"users/authenticate",command,httpOptions)
    }
    getAll(): Observable<Array<any>>{
        return this.http.get<Array<any>>(environment.apiUrl +"u/allUsers",httpOptions)
    }
}