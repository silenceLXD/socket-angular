import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListSideComponent } from './chat-list-side.component';

describe('ChatListSideComponent', () => {
  let component: ChatListSideComponent;
  let fixture: ComponentFixture<ChatListSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatListSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
