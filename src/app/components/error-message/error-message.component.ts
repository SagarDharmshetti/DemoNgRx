import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as userModel from '../../../store/user/index';
import * as userAction from '../../../store/user/user.action';
import * as userSelector from '../../../store/user/user.selector';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  getuserList?: Subscription;
  userList: userModel.User[] = [];

  constructor(private store: Store<userModel.UserState>) {}

  ngOnInit() {
    this.store.dispatch(new userAction.GetUserListAction('')); // empty string for now
    this.subscriptionInit();
  }

  subscriptionInit() {
    this.getuserList = this.store
      .select(userSelector.getUserList)
      .subscribe((users: userModel.User[]) => {
        if (users) {
          this.userList = users;
          console.log(users);
        }
      });
  }
}
