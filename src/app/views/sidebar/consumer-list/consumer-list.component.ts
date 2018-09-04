import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.css']
})
export class ConsumerListComponent implements OnInit, OnDestroy {
  allUserList: any; // 用户列表
  consumer_alluserlist: any;
  
  constructor(private websocketService: WebsocketService,
    private _eventBus: EventBusService) { 
      // this.websocketService.getLoadUserList();
    }

  ngOnInit() {
    
    this.consumer_alluserlist = this.websocketService.getAllUserList_respond().subscribe(list => {
      const _userlist:any = list;
      this.allUserList = _userlist;
    })
  }

  /**
   * chooseUser 查看联系人详细信息
   * @param list 
   */ 
  userDetail: any = {
    userName: '',
    userId: '',
    userArea: ''
  };
  chooseUser(list: any) {
    this.userDetail = list;
  }
  // 发送消息
  sendMessageFn() {
    alert("不许聊天")
  }
  ngOnDestroy() {
    // this.consumer_alluserlist.unsubscribe();
   }
}
