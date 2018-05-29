import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
    return this.http.post<Associate>(Constants.ASSOCIATE_API_ENDPOINT+'associate', associate, Constants.HTTP_OPTIONS);
  }

  /*addCategory(category:Category):Observable<Category>{
    let body = JSON.stringify(category);
    return this.http.post<Category>(Constants.API_ENDPOINT+'category', category, Constants.HTTP_OPTIONS);
  }

  editCategory(category:Category):Observable<Category>{
    let body = JSON.stringify(category);
    return this.http.put<Category>(Constants.API_ENDPOINT+'category', category, Constants.HTTP_OPTIONS);
  }*/

  deleteAssociate(id:number):Observable<any>{
    return this.http.delete(Constants.ASSOCIATE_API_ENDPOINT+'associate/'+id, Constants.HTTP_OPTIONS);
  }

}
