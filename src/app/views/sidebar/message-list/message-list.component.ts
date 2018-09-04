import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  userList: any =[]; // 用户列表
  connection_userlist: any;
  connection_curruser: any;
  
   // 当前用户信息
   selfData = {
    clientId: '',
    clientName: '',
    sessionId:'',
    online:''
  };
  // 目标用户信息
  targetSelectData:any = {
    clientId:'',
    clientName:'',
    sessionId:''
  };
  hasNewMsg:any = {};
  constructor(private websocketService: WebsocketService,
  private _eventBus: EventBusService) {
    // this.websocketService.getLoadUserList();
  }

  ngOnInit() {
    this._eventBus.loginUserData.subscribe(value => {
        this.selfData = value;
        console.log(value)
    });
    
    this.connection_userlist = this.websocketService.getLoadUserList_respond().subscribe(list => {
      const _userlist:any = list;
      _userlist.data.forEach(item => {
        // this.hasNewMsg[item.clientId] = 0;
      });
      this.userList = _userlist.data;
    })

    
  }
  
  /**
   * 选择要发送消息的对象
   * @param item 选择对象
   */ 
  select(item: any){
    if(item.sessionId!=this.selfData.sessionId){
      this.targetSelectData = {
        clientId: item.clientId,
        clientName: item.clientName,
        sessionId: item.sessionId
      };
      // this.hasNewMsg[item.clientId] = 0;
    }
  }
  getHasNewMsg(val) {
    this.hasNewMsg = val;
  }

  
  /**
   * 产生随机数函数
   * @param n 
   */
  RndNum(n:number) {
    var rnd = "";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
  }
 
  
}
