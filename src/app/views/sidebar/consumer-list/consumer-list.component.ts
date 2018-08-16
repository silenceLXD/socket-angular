import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.css']
})
export class ConsumerListComponent implements OnInit, OnDestroy {
  allUserList: any = [{
    clientName: 'lxd11',
    clientId: 2,
    clientArea: '北京'
  },{
    clientName: 'lxd22',
    clientId: 3,
    clientArea: '郑州'
  },{
    clientName: 'lxd33',
    clientId: 4,
    clientArea: '上海'
  },{
    clientName: 'lxd44',
    clientId: 5,
    clientArea: '重庆'
  }]; // 用户列表
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

  /**
   * chooseUser 查看联系人详细信息
   * @param list 
   */ 
  userDetail: any = {
    clientName: '',
    clientId: '',
    clientArea: ''
  };
  chooseUser(list: any) {
    this.userDetail = list;
  }
  // 发送消息
  sendMessageFn() {
    alert("不许聊天")
  }
  ngOnDestroy() {
    // this.consumer_userlist.unsubscribe();
   }
}
