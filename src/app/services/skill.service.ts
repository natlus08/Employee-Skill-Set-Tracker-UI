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

  addSkill(skill:Skill):Observable<Skill>{
    let body = JSON.stringify(skill);
    return this.http.post<Skill>(Constants.SKILL_API_ENDPOINT+'skill', skill, Constants.HTTP_OPTIONS);
  }

  deleteSkill(id:number):Observable<any>{
    return this.http.delete(Constants.SKILL_API_ENDPOINT+'skill/'+id, Constants.HTTP_OPTIONS);
  }

  editSkill(skill:Skill):Observable<Skill>{
    let body = JSON.stringify(skill);
    return this.http.put<Skill>(Constants.SKILL_API_ENDPOINT+'skill', skill, Constants.HTTP_OPTIONS);
  }

}
