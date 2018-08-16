import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  userList: any =[{
    clientName: 'lxdsss',
    clientId: 2
  }]; // 用户列表
  connection_userlist: any;
  connection_curruser: any;
  connection_msg: any;

  messagesList = []; // 消息列表
  Inputmessage: any = '';
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
  constructor(private websocketService: WebsocketService,
  private _eventBus: EventBusService) {

  }

  ngOnInit() {
    this._eventBus.loginUserData.subscribe(value => {
        this.selfData = value;
        console.log(value)
    });
    this._eventBus.userListData.subscribe(value => {
      this.userList = value;
      console.log(value)
    });
    // this.connection_userlist = this.websocketService.loadUserList().subscribe(list => {
    //   const _userlist:any = list;
    //   this.userList = _userlist.data;
    // })

    this.connection_msg = this.websocketService.getMessages().subscribe(message => {
      const _messagelist:any = message;
      this.messagesList.push(_messagelist);
      this.msgScroll();
    })
  }
  // ngAfterViewInit() {
  //   this._eventBus.userListData.subscribe(value => {
  //     this.userList = value;
  //     console.log(value)
  //   });
  // }
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
    }
  }

  /**
   * 发送消息
   * @param msg 消息内容
   */
  sendMsFn($event, msg: string) {
    if(msg && $event.keyCode == 13){
      var jsonObject = {
        sourceClientId: this.selfData.clientId,
        targetClientId: this.targetSelectData.clientId,
        msg: msg,
        clientId: this.targetSelectData.clientId,
        clientName: this.targetSelectData.clientName,
        date: new Date(),
        img: '/assets/images/1.jpg',
        self: true
      };
      this.messagesList.push(jsonObject);
      this.websocketService.sendMessage(jsonObject);
      this.msgScroll();
      this.Inputmessage = '';
    }
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
  /**
   * 滚动到底部
   */
  msgScroll(){
    setTimeout(function () {
      var _el = document.getElementById('message-con');
      // _el.scrollTop = _el.scrollHeight;
      _el.scrollTop = _el.scrollHeight - _el.clientHeight;
    }, '100');
  }
  /**
   * 组件注销
   */
  ngOnDestroy() {
    // this.connection_userlist.unsubscribe();
   }

}
