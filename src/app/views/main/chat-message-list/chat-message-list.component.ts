import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.css']
})
export class ChatMessageListComponent implements OnInit {
  @Input() targetSelectData: any; //父传子  获取来自父组件目标用户的数据
  @Input() chatType: any;
  // @Output() selectedUserInfo: any;  //子传父  
  @Output() hasNewMsgEmit: EventEmitter<any> = new EventEmitter(); //子传父
  
  connection_msg: any;

  messagesList = []; // 消息列表
  Inputmessage: any = '';
  // 新消息提醒(num)
  hasNewMsg: any = {};
   // 当前用户信息
   selfData = {
    clientId: '',
    clientName: '',
    sessionId:'',
    online:''
  };
  // 目标用户信息
  // targetSelectData:any = {
  //   clientId:'',
  //   clientName:'',
  //   sessionId:''
  // };

  constructor(private websocketService: WebsocketService,
    private _eventBus: EventBusService) { 
      // this.websocketService.getLoadUserList();
    }

  ngOnInit() {
    this._eventBus.loginUserData.subscribe(value => {
      this.selfData = value;
      console.log(value)
  });

    this.connection_msg = this.websocketService.getMessages().subscribe(message => {
      const _messagelist:any = message;
      this.messagesList.push(_messagelist);
      this.hasNewMsg[_messagelist.clientId] += 1;
      this.hasNewMsgEmit.emit(this.hasNewMsg);
      this.msgScroll();
    })
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
   * 查询当前会议室成员
   */
  chatRoomMember: any;
  searchMember(roomId) {
    this.websocketService.getChatroomMember_respond(roomId).subscribe(list => {
      const _list:any = list;
      this.chatRoomMember = _list.members;
    })
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

}
