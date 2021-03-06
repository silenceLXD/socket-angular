import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
// import module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ElModule } from 'element-angular'

// import { WebsocketService } from '@services/websocket.service';
// import { EventBusService } from '@services/event-bus.service';

import { FilterMessagePipe } from '@pipes/filter-message.pipe';

import { ChatMessageListComponent } from './views/main/chat-message-list/chat-message-list.component';

//用户列表
import { ConsumerListComponent } from './views/sidebar/consumer-list/consumer-list.component';
//最新消息列表
import { MessageListComponent } from './views/sidebar/message-list/message-list.component';
// 收藏文章列表
import { ArticleListComponent } from './views/sidebar/article-list/article-list.component';
import { ChatroomListComponent } from './views/sidebar/chatroom-list/chatroom-list.component';

const appRoutes: Routes = [
  { path: 'message', component: MessageListComponent },
  { path: 'consumer', component: ConsumerListComponent },
  { path: 'article', component: ArticleListComponent },
  { path: 'chatroom', component: ChatroomListComponent },
  { path: '', redirectTo: '/message', pathMatch: 'full'} // 默认定向到list
];
@NgModule({
  declarations: [
    AppComponent,
    FilterMessagePipe,
    ChatMessageListComponent,
    
    ConsumerListComponent,
    MessageListComponent,
    ChatroomListComponent,
    ArticleListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,{useHash:true}),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ElModule.forRoot()
  ],
  providers: [
    // {provide: WebsocketService, useClass: WebsocketService},
    // {provide: EventBusService, useClass: EventBusService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
