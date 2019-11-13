import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebApiWork } from './work/WebApiWork';
import { WebApiNotify } from './notify/WebApiNotify';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  endpoint: string = "auth";
  redirectUrl: string;
  subject = new Subject<any>();
  user: any = null;
  title = 'DoloresSzopWeb';
  workResponse: any = null;
  notifyResponse: any = null;
  public readonly localStorageCurrentUserKey = "token";
  constructor(private webApiWork: WebApiWork, private webApiNotify: WebApiNotify) {

  }
  askWork() {
    this.workResponse = null;
    this.webApiWork.getWork().subscribe(data => {
      this.workResponse = data;
    }, error => {
      alert("Forbiden")
    })
  }
  askNotify(){
    this.notifyResponse = null;
    this.webApiNotify.getNotify().subscribe(data => {
      this.notifyResponse = data;
    }, error => {
      alert("Forbiden")
    })
  }
}