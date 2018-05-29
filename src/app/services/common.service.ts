import { Injectable } from '@angular/core';

import { Constants } from '../constants/constants';

@Injectable()
export class CommonService {

  constructor() { }

  getIndexById(id: number, array: any[]) : number {
    let pos:number = -1;
    array.forEach(function(data, index){
      if(data.id === id){
        pos = index;
      }
    });
    return pos;
  }

  getObjectById(id: number, array: any[]) : any {
    var object = null;
    array.forEach(function(data){
      if(data.id === id){
        object = data;
      }
    });
    return object;
  }
}
