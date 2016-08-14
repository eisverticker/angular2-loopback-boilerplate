import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { User } from './user';
import { AuthService } from './auth.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
  moduleId:     module.id,
  selector:    'user-logout',
  templateUrl: 'logout.component.html',
  styleUrls: [],
  directives: [],
  providers: []
})
export class LogoutComponent implements OnInit{
  @Output() done: EventEmitter<any> = new EventEmitter();

  public user: User = new User("","","");

  constructor(
    private auth: AuthService,
    private notify: NotificationService
  ){}

  ngOnInit(){
    this.user = this.auth.getActiveUser();
  }

  public doLogout(){
    this.auth.logout().then(
      () => {
        this.notify.notify(new Notification('message.goodbye', ['info']));
        this.done.emit(null);
      },
      (err) => {
        console.log(err);
        this.notify.notify(
          Notification.message('request.logoutFailed')
        )
      }
    );
  }

}
