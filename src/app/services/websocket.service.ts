import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
// import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  io;
  thisClientName: any;//用户自定义名称
  // 消息
  message$: Observable<string>;
  private _message$ = new Subject<string>();
  // 列表
  list$: Observable<object>;
  private _list$ = new Subject<object>();
  // 连接者信息
  currentUser$: Observable<object>;
  private _currentUser$ = new Subject<object>();

  constructor() {
    this.disp_prompt();
    // this.io = SocketIO('ws://172.18.6.168:8081?clientName=lxd');
    this.io.emit('connection');
    
    // 客户端在监听服务器推送的 'chat_message'事件。
    // this.io.on('chat_message', (msg) => this._message$.next(msg));

    // 客户端在监听服务器推送的 'load_current_user'事件, 监听当前用户信息。
    this.getCurrentUser();
    // this.io.on('load_current_user',(data) => this._currentUser$.next(data));
  }

  /**
   * disp_prompt()
   * 初始化 连接服务端socket
   * 输入连接用户名
   */ 
  disp_prompt() {
    var name = prompt("请输入您的名字","")
    if (name!=null && name!="") {
      this.thisClientName = name;
      this.io = SocketIO('ws://172.18.6.168:8081?clientName='+name);
    }
  }

  /**
   * sendMessage()
   * 发送消息
   * @param message 
   */
  sendMessage(message: any) {
    // 对比原生的websocket实现，你可以 emit 指定类型的事件，服务器只要在监听
    // 你指定的事件，就会做响应的处理。普通的websocket 里则要通过的发送的信息中
    // 添加额外的类型信息，服务器通过解析才知道这个请求对应的处理方式。
    // 这里服务器在监听着 'message' 事件。
    this.io.emit('message', message);
    
  }

  /**
   * getMessages()
   * 接收消息
   */
  getMessages() {
    let observable = new Observable(observer => {
     this.io.on('chat_message', (data) => {
      observer.next(data.data);  
     });
     return () => {
      this.io.disconnect();
     }; 
    })   
    return observable;
   } 
  
   /**
    * getLoadUserList_respond()
    * 监听服务端返回的在线人员列表 load_user_list
    */
  getLoadUserList_respond() {
    this.io.emit('load_user_list');

    let observable = new Observable(observer => {
     this.io.on('load_user_list', (data) => {
      observer.next(data);  
     });
     return () => {
      this.io.disconnect();
     }; 
    })   
    return observable;
  }

  /**
    * getCurrentUser()
    * 发送 获取当前登录用户数据
    */
   getCurrentUser() {
    this.io.emit('load_current_user');
   }
   /**
    * loadCurrentUser_respond()
    * 监听服务端返回的 当前用户信息 load_current_user
    */
  getCurrentUser_respond() {
    this.io.emit('load_current_user');

    let observable = new Observable(observer => {
     this.io.on('load_current_user', (data) => {
      observer.next(data);  
     });
     return () => {
      this.io.disconnect();
     }; 
    })   
    return observable;
   }

   /**
    * offline_respond()
    * 监听服务端返回的用户离线消息 offline_chat_message
    */
   offline_respond() {
    let observable = new Observable(observer => {
     this.io.on('offline_chat_message', (data) => {
      observer.next(data);  
     });
     return () => {
      this.io.disconnect();
     }; 
    })   
    return observable;
   } 

   /**
    * getAllUserList_respond()
    * 事件：加载所有用户
    * 参数：无
    * 返回内容：[{"userId":1,"userName":"zpp"},{"userId":2,"userName":"zpp0"}]
    */
   getAllUserList_respond() {
    this.io.emit('user_list');
    return new Observable(observer => {
      this.io.on('user_list', (data) => {
        observer.next(data);
      });
      return () => {
        this.io.disconnect();
      };
    });
   }

   /**
    * chatroomCreate()
    * 发送创建聊天室事件 chatroom_create
    */
  //  chatroomCreate(name){
  //   this.io.emit('chatroom_create', name);
  //  }
  getChatroomCreate_respond(roomName) {
    if (roomName !== null) {
      this.io.emit('chatroom_create', { roomName: roomName });
    }
    return new Observable(observer => {
      this.io.on('chatroom_create', (data) => {
        observer.next(data);
      });
      return () => {
        this.io.disconnect();
      };
    });
  }
   
   /**
    * getChatroomList_respond()
    * 发送加载聊天室列表事件
    * 监听服务端返回的聊天室列表的消息 chatroom_list
    */
   getChatroomList_respond() {
    this.io.emit('chatroom_list');
    let observable = new Observable(observer => {
      this.io.on('chatroom_list', (data) => {
       observer.next(data);  
      });
      return () => {
       this.io.disconnect();
      }; 
     })   
     return observable;
   }

   /**
    * chatroom_add_user
    * 事件：聊天室添加用户
    * 参数：{"roomId":roomId,"userIds":[1,2]}
    */
    chatroomAddUser(data) {
      this.io.emit('chatroom_add_user', data);
    }

    /**
     * chatroom_info
     * 事件：聊天室信息
     * 参数：{"roomId":1}
     * 返回内容：{"memberCount":10,"chatroom":{"roomId"1,"roomName":"临时会话"}}
     */
    getChatroomInfo_respond(roomId) {
      if (roomId !== null) {
        this.io.emit('chatroom_info', { roomId: roomId });
      }
      return new Observable(observer => {
        this.io.on('chatroom_info', (data) => {
          observer.next(data);
        });
        return () => {
          this.io.disconnect();
        };
      });

      // let observable = new Observable(observer => {
      //   this.io.on('chatroom_info', (data) => {
      //    observer.next(data);
      //   });
      //   return () => {
      //    this.io.disconnect();
      //   }; 
      //  })   
      //  return observable;
    }

     /**
      * chatroom_member
      * 事件：获取聊天室成员
      * 参数：{"roomId":1}
      * 返回内容：{"members":{"roomId"1,"userId":1,"userName":"zpp"}}
      */
    
    getChatroomMember_respond(roomId) {
      if (roomId !== null) {
        this.io.emit('chatroom_member', { roomId: roomId });
      }
      let observable = new Observable(observer => {
        this.io.on('chatroom_member', (data) => {
         observer.next(data);
        });
        return () => {
         this.io.disconnect();
        }; 
       })   
       return observable;
    }
}
