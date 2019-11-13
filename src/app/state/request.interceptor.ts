import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserAuthenticated()) {
       request = request.clone({
        headers: request.headers.set('Authorization', this.getToken())
          .append('Access-Control-Allow-Origin', '*')
      });
    //   if(authReq.method.toLowerCase() == 'post' ||authReq.method.toLowerCase() == 'put'){
    //     var user = this.authService.getCurrentUser();
    //       authReq.body.userName = user.user.name
    //   }
    }
    return next.handle(request)
    };
  getToken() {
    var user: any = this.authService.getCurrentUserWithToken();
    if (user)
      return "Bearer " + user.token;
  }
}