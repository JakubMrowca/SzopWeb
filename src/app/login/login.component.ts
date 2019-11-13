import { Component, OnInit } from '@angular/core';
import { ApplicationState } from '../state/ApplicationState';
import { EventEmiter } from '../helpers/EventEmiter';
import { NgForm } from '@angular/forms';
import { SignalREventEmiter } from '../helpers/SignalREventEmiter';
import { UserAuthenticate } from '../users/events/UserAuthenticate';
import { AuthenticateUserCommand } from '../users/commands/AuthenticateUserCommand';
import { WebApiUsers } from '../users/WebApiUsers';
import { AuthService } from '../state/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authorization: boolean
  user:any
  users:Array<any>
  authenticateUserCommand:AuthenticateUserCommand

  constructor(private appState: ApplicationState,private authService:AuthService, private eventEmiter: EventEmiter, private signalR: SignalREventEmiter, private webApiUsers:WebApiUsers) {
    this.authenticateUserCommand = new AuthenticateUserCommand();
    this.signalR.initUserConnection();

    this.eventEmiter.getMessage<UserAuthenticate>("UserValid").subscribe(data => {
      this.onAuthorize(data)
    })
  }

  ngOnInit() {
  }

  onAuthorize(data) {
    this.authorization = false;
    this.user = data;
    this.authService.save(this.user);
    console.log(data);
  }
  
  showAllUsers(){
    this.webApiUsers.getAll().subscribe(data =>{
      this.users = data;
    })
  }

  login() {
    this.authorization = true;
    this.authenticateUserCommand.connectionId = this.appState.HubConnectionId;
    this.webApiUsers.authorizeuser(this.authenticateUserCommand)
      .subscribe(data => { }, error => {
        this.authorization = false;
      })
  }
}
