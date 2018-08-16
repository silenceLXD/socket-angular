import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.css']
})
export class ConsumerListComponent implements OnInit, OnDestroy {
  allUserList: any = []; // 用户列表
  consumer_userlist: any;
  
  constructor(private websocketService: WebsocketService,
    private _eventBus: EventBusService) { }

  ngOnInit() {
    this._eventBus.userListData.subscribe(value => {
      this.allUserList = value;
    });
    this._eventBus.loginUserData.subscribe(value => {
      console.log(value)
    });
  }
  ngOnDestroy() {
    // this.consumer_userlist.unsubscribe();
   }
}
