import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Associate } from '../model/associate';

import { Constants } from '../constants/constants';

@Injectable()
export class AssociateService {

  constructor(private http:HttpClient) { }

  getAssociates():Observable<Associate[]>{
    return this.http.get<Associate[]>(Constants.ASSOCIATE_API_ENDPOINT+'associates', Constants.HTTP_OPTIONS);
  }

  getAssociate(id:number):Observable<Associate>{
    return this.http.get<Associate>(Constants.ASSOCIATE_API_ENDPOINT+'associate/'+id, Constants.HTTP_OPTIONS);
  }

  addAssociate(associate:Associate):Observable<Associate>{
    let body = JSON.stringify(associate);
    return this.http.post<Associate>(Constants.ASSOCIATE_API_ENDPOINT+'associate', body, Constants.HTTP_OPTIONS);
  }

  addAvatar(avatar:File, id:number):Observable<Associate>{
    if(avatar){
      const formData: FormData = new FormData();
      formData.append('image', avatar, avatar.name);
      return this.http.post<Associate>(Constants.ASSOCIATE_API_ENDPOINT+'avatar/'+id, formData, Constants.HTTP_OPTIONS_FILE);
    }
  }

  deleteAssociate(id:number):Observable<any>{
    return this.http.delete(Constants.ASSOCIATE_API_ENDPOINT+'associate/'+id, Constants.HTTP_OPTIONS);
  }

}
