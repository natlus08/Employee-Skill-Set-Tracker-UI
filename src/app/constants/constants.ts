import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Constants {
  public static ASSOCIATE_API_ENDPOINT = 'http://localhost:8080/associate-api/';
  public static SKILL_API_ENDPOINT = 'http://localhost:8080/skill-api/';
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
  };
  public static HTTP_OPTIONS_FILE = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
  };
}
