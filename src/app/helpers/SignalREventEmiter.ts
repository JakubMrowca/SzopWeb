import { Injectable } from "@angular/core";
import { EventEmiter } from "./EventEmiter";
import * as signalR from '@aspnet/signalr';
import { ApplicationState } from "../state/ApplicationState";
import { environment } from 'src/environments/environment';
@Injectable()
export class SignalREventEmiter {
    connection;

    constructor(public eventService: EventEmiter, public appState: ApplicationState) {

    }

    initUserConnection() {
        this.connection = new signalR.HubConnectionBuilder().withUrl(environment.socketUrl + 'userHub').build();
        this.connection.start().then((data) => {
            console.log(data);
            console.log(this.connection);
            this.connection.send("InitHubUser", "1", "2");
        })
        var that = this;

        this.connection.on("HubUserInited", (event, message) => {
            console.log(event);
            this.appState.HubConnectionId = message;
        });
        this.connection.on("EventEmited", function (event, message) {
            that.eventService.sendEvent(event, message);
        });
    }
}