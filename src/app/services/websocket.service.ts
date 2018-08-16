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
    this.io.emit('load_current_user');
    // this.io.on('load_current_user',(data) => this._currentUser$.next(data));

    // 客户端在监听服务器推送的 'load_user_list'事件, 监听在线人员列表。
    // this.io.emit('load_user_list');
    // this.io.on('load_user_list',(list) => this._list$.next(list));

    // 这里为什么进行额外的转换，请看历史文章： Rxjs 之 asObservable
    //  this.message$ = this._message$.asObservable();
    //  this.list$ = this._list$.asObservable();
    //  this.currentUser$ = this._currentUser$.asObservable();
  }
  disp_prompt() {
    var name = prompt("请输入您的名字","")
    if (name!=null && name!="") {
      this.thisClientName = name;
      this.io = SocketIO('ws://172.18.6.168:8081?clientName='+name);
    }
  }
  /**
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
    * loadUserList()
    * 监听在线人员列表 load_user_list
    */
  loadUserList() {
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
    * loadCurrentUser()
    * 监听当前用户信息 load_current_user
    */
  loadCurrentUser() {
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

   offline() {
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
}
