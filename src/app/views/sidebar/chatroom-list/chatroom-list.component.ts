import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.css']
})
export class ChatroomListComponent implements OnInit, OnDestroy {
  userLength: any = [{
    name: '1',
    id: 1,
    checked: false
  },{
    name: '2',
    id: 2,
    checked: false
  },{
    name: '3',
    id: 3,
    checked: false
  },{
    name: '4',
    id: 4,
    checked: false
  },{
    name: '5',
    id: 5,
    checked: false
  },{
    name: '6',
    id: 6,
    checked: false
  }];
  
  choosedUser: any = [];
  connection_roommsg:any;
  roomMessagesList: any = [];
  constructor(private websocketService: WebsocketService,
    private _eventBus: EventBusService) { }

  ngOnInit() {
    this.connection_roommsg = this.websocketService.getMessages().subscribe(message => {
      const _messagelist:any = message;
      this.roomMessagesList.push(_messagelist);
      // this.msgScroll();
    })
  }
  /**
   * 创建群聊
   */
  creatChatRoomFn(name) {
    let nameObj = {"roomName": "临时会话"};
    this.websocketService.chatroomCreate(nameObj);
    alert('ok')
  }
  /**
   * 选择群聊用户
   * @param e 
   * @param data 
   */
  chooseUserFn(e, data) {
    data.checked = e;
    if(e){
      this.choosedUser.push(data);
    }else{
      let index = this.choosedUser.indexOf(data);
      this.choosedUser.splice(index,1);
    }
    console.log(e,data);
  }
  /**
   * 删除群聊用户
   * @param user 
   */
  removeFn(user) {
    user.checked = false;
    let index = this.choosedUser.indexOf(user);
    this.choosedUser.splice(index,1);
  }

  /**
   * 组件注销
   */
  ngOnDestroy() {
    this.connection_roommsg.unsubscribe();
   }
}
