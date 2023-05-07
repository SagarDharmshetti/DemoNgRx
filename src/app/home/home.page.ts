import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as userModel from '../../store/user/index';

import { DataService } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  getuserList?: Subscription;
  userList: userModel.User[] = [];

  Data: any;

  constructor(
    private store: Store<userModel.UserState>,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data) => {
      console.table(data);
      this.Data = data.items;
    });
  }

}
