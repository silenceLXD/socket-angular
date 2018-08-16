// 自定义管道必须依赖这两个
import { Pipe, PipeTransform } from '@angular/core';

// 管道装师符 ， name就是管道名称
@Pipe({
  name: 'filterMessage',
  pure: false
})


export class FilterMessagePipe implements PipeTransform {
  // value : 就是传入的值
  // ...args : 参数集合(用了...拓展符),会把数组内的值依次作为参数传入
  // ...args可以改成我们常规的写法(value:any,start:number,end:number)
  // transform(value: any, filterField: string, keyword:string): any {
  //   if(value){
  //     if (!filterField || !('' + keyword)) {
  //       return;
  //     }
  //     return value.filter(item => {
  //       const fieldValue = item[filterField];
  //       return +fieldValue == +keyword;
  //       // return value.filter(item => item.filterField.indexOf(this.search) > -1);
  //     });
  //   }else {
  //     return;
  //   }
  // }

  transform(list: any[], filterField: any): any {
    if(list){
      if (!filterField) {
        return;
      }
      return list.filter(item => {
        if(item.clientId == filterField){
          return item
        }
        // return value.filter(item => item.filterField.indexOf(this.search) > -1);
      });
    }else {
      return;
    }
  }

}