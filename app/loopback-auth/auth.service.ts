import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { User } from './user';

//import { AuthAction } from './auth-action';

@Injectable()
export class AuthService{
  private isInitializedSubject: BehaviorSubject<boolean>;
  public isInitialized: Observable<boolean>;

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: Http,
    private backend: BackendHelper
  ){
    //Initalize Reactive Components (Observables)
    this.userSubject = new BehaviorSubject(User.createGuest());
    this.user = this.userSubject.asObservable();

    this.isInitializedSubject = new BehaviorSubject(false);
    this.isInitialized = this.isInitializedSubject.asObservable();

    this.loadAuthenticatedUser().then(
      () => { this.isInitializedSubject.next(true) },
      () => { this.isInitializedSubject.next(true) }
    );
  }

  public getActiveUser(){
    return this.userSubject.getValue();
  }

  public loadAuthenticatedUser(): Promise<User>{
    let url = this.backend.authUrl('AppUsers/'+this.userID, this.token);

    if(this.token === null || this.userID === null){
      return Promise.reject<User>("no local user data found");
    }else{
      return this.http.get(url)
      .map(data => data.json())
      .toPromise()
      .then(
        (data) => {
          let user = new User(data.username, data.email, "",[])
          this.userSubject.next(user);
          return user;
        },
        (res) => {
          this.reset();
          return Promise.reject<User>(res);
        }
      );
    }
  }

  public login(user: User): Promise<void>{
    return this.http.post(this.backend.unAuthUrl('AppUsers/login'), {
      "email": user.mail,
      "password": user.password
    })
    .timeout(5000, "timeout")
    .toPromise()
    .then(
      (res) => {
         let data = res.json();
         this.userID = data.userId;
         this.token = data.id;//save token to localStorage
         this.loadAuthenticatedUser().then(
           () => { return; },
           () => { return; }
         );
      },
      (err) => {
        if(err.status == 401){
          return Promise.reject("wrong credentials");
        }else{
          throw "unexpected result 34343-AuthService";
        }
      }
    );
  }
  public logout(): Promise<void>{
    return this.http.post(this.backend.authUrl('AppUsers/logout', this.token),{})
     .timeout(5000, "timeout")
     .toPromise()
     .then(
       ()=> {
         this.reset();
         this.userSubject.next(User.createGuest());
       }
     )
  }
  public verify(code: string): Promise<any>{
    let url = 'AppUsers/confirm?uid='+this.userID+'&token='+code;

    return this.http.get(this.backend.authUrl(url,this.token))
    .toPromise();
  }

  public resetPassword(user: User): Promise<any>{
    let url = this.backend.unAuthUrl('AppUsers/reset');

    return this.http.post(url, {
      "email": user.mail
    })
    .timeout(5000, "timeout")
    .toPromise();
  }

  public register(user: User): Promise<void>{
    let url = this.backend.unAuthUrl('AppUsers');

    return this.http.post(url,{
      "realm": user.name.toLowerCase(),
      "username": user.name,
      "email": user.mail,
      "password": user.password
    })
    .timeout(5000, "timeout")
    .toPromise()
    .then(
      () => {
        return;
      }
    );
  }

  public get token(): string{
    return localStorage.getItem('token');
  }
  public set token(id: string){
    localStorage.setItem('token',id);
  }

  public get userID(): string{
    return localStorage.getItem('userID');
  }
  public set userID(id: string){
    localStorage.setItem('userID',id);
  }

  private reset(){
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

}
