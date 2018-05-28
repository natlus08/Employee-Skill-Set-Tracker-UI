import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Skill } from '../model/skill';

import { Constants } from '../constants/constants';

@Injectable()
export class SkillService {

  constructor(private http:HttpClient) { }

  getSkills():Observable<Skill[]>{
    return this.http.get<Skill[]>(Constants.SKILL_API_ENDPOINT+'skills', Constants.HTTP_OPTIONS);
  }

  /*getAssociate(id:number):Observable<Associate>{
    return this.http.get<Associate>(Constants.ASSOCIATE_API_ENDPOINT+'associate/'+id, Constants.HTTP_OPTIONS);
  }

  addCategory(category:Category):Observable<Category>{
    let body = JSON.stringify(category);
    return this.http.post<Category>(Constants.API_ENDPOINT+'category', category, Constants.HTTP_OPTIONS);
  }

  editCategory(category:Category):Observable<Category>{
    let body = JSON.stringify(category);
    return this.http.put<Category>(Constants.API_ENDPOINT+'category', category, Constants.HTTP_OPTIONS);
  }

  deleteAssociate(id:number):Observable<any>{
    return this.http.delete(Constants.ASSOCIATE_API_ENDPOINT+'associate/'+id, Constants.HTTP_OPTIONS);
  }*/

}
