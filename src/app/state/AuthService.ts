import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';




@Injectable({ providedIn: 'root' })
export class AuthService {

    redirectUrl: string;
    currentUser: any;
    subject = new Subject<any>();

    public readonly localStorageCurrentUserKey = "token";
    constructor(private router: Router) { }

    save(user: any) {
        this.currentUser = user;
        this.subject.next(user);

        if (this.currentUser && this.currentUser.token) {
            localStorage.setItem(this.localStorageCurrentUserKey, JSON.stringify(this.currentUser));
            return this.currentUser;
        }
        return null;

    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.localStorageCurrentUserKey);
        // this.router.navigate(['/login']);
        //sessionStorage.removeItem(this.localStorageCurrentUserKey);
    }

    private getCurrentUserWithTokenString(): string {
        return localStorage.getItem(this.localStorageCurrentUserKey);
    }
    // private getCurrentUserSessionString(): string {
    //     return sessionStorage.getItem(this.localStorageCurrentUserKey);
    // }

    public isUserAuthenticated(): boolean {
        if (this.getCurrentUser()) {
            return true;
        }
        return false;
    }

    public getCurrentUser() {
        const currentUserWithTokenString = this.getCurrentUserWithTokenString();
        if (currentUserWithTokenString) {
            return JSON.parse(currentUserWithTokenString)
        }
        return null;
    }

    public getCurrentUserWithToken() {
        const currentUserWithTokenString = this.getCurrentUserWithTokenString();
        if (currentUserWithTokenString) {
            return JSON.parse(currentUserWithTokenString)
        }
        return null;
    }
}
