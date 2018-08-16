import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  public loginUserData: Subject<any> = new Subject<any>();

  public userListData: Subject<any> = new Subject<any>();
  constructor() { }
}
