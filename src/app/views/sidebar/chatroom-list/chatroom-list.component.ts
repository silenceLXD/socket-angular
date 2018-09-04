import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.css']
})
export class ChatroomListComponent implements OnInit {
  allUserLength: any;
  
  choosedUser: any = [];
  connection_userlist: any;
  connection_roommsg:any;
  roomList: any;
  constructor(private websocketService: WebsocketService,
    private _eventBus: EventBusService) {
      // this.websocketService.getLoadUserList();
    }
  
  ngOnInit() {
    this.connection_roommsg = this.websocketService.getChatroomList_respond().subscribe(list => {
      const _list:any = list;
      this.roomList = _list.data;
      console.log(_list)
    })
    this.connection_userlist = this.websocketService.getAllUserList_respond().subscribe(list => {
      const _userlist:any = list;
      this.allUserLength = _userlist;
    })
  }
  
  chooseUser_div: boolean = false;
  thisRoomName: any;
  showDialog: boolean =false;
  thisCreateRoomData: any;
  /**
   * creatChatRoomFn()
   * 创建聊天室
   */
  creatChatRoomFn() {
    this.websocketService.getChatroomCreate_respond(this.thisRoomName).subscribe(data => {
      const _data:any = data;
      this.thisCreateRoomData = _data;
    });
    this.showDialog = false;
    this.chooseUser_div = true;
    this.chat_div = false;
  }

  /**
   * 确定创建群聊
   */
  // sureCreatChatRoomFn() {
  //   this.chooseUser_div = true;
  // }
  /**
   * 确定已选择的用户参与群聊
   */
  chooseChatUserFn(roomId) {
    const arrList = [];
    this.choosedUser.forEach(item => {
      arrList.push(item.userId);
    });
    let postObj = { "roomId": this.thisCreateRoomData.roomId, "userIds": arrList }
    this.websocketService.chatroomAddUser(postObj);

    this.websocketService.getChatroomList_respond().subscribe(list => {
      const _list:any = list;
      this.roomList = _list.data;
      console.log(_list)
      this.chooseUser_div = false;
    })
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

  chat_div:boolean = false;
  targetSelectData: any;
  /**
   * 选择聊天室 发送聊天信息
   */
  toChatRoomFn(item) {
    // let getObj = {"roomId": item.roomId};
    let roomId = item.roomId;
    this.websocketService.getChatroomInfo_respond(roomId).subscribe(data => {
      const _roomInfo:any = data;
      this.targetSelectData = _roomInfo.chatroom;
      this.chat_div = true;
    })
  }
  hasNewMsg:any = {};
  getHasNewMsg(val) {
    this.hasNewMsg = val;
  }
}
