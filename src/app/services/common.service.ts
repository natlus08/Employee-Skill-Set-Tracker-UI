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
}
