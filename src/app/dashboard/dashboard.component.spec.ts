import { TestBed, async, fakeAsync, tick, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router, Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import components
import { AppComponent } from '../app.component';
import { AssociateComponent } from '../associate/associate.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { SkillComponent } from '../skill/skill.component'
import { routing } from '../router/routing.module';
//import services
import { AssociateService } from '../services/associate.service'
import { SkillService } from '../services/skill.service'
import { CommonService } from '../services/common.service'
//import pipes
import { NameFilter } from '../pipes/namefilter.pipe';
import { IdFilter } from '../pipes/idfilter.pipe';
import { EmailFilter } from '../pipes/emailfilter.pipe';
import { MobileFilter } from '../pipes/mobilefilter.pipe';
import { SkillFilter } from '../pipes/skillfilter.pipe';
import { AssociateSkillFilter } from '../pipes/associateskillfilter.pipe';

import { Constants } from '../constants/constants';

describe('DashboardComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<any>;   
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AssociateComponent,
        DashboardComponent,
        SkillComponent,
        NameFilter,
        IdFilter,
        EmailFilter,
        MobileFilter,
        SkillFilter,
        AssociateSkillFilter
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        HttpClientTestingModule
      ],
      providers: [AssociateService, SkillService, CommonService,  {provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents(); 
    // get the router from the testing NgModule
    router = TestBed.get(Router);
    // get the location from the testing NgModule,
    // which is a SpyLocation that comes from RouterTestingModule
    location = TestBed.get(Location);
    // compile the root component of the app
    fixture = TestBed.createComponent(DashboardComponent);
    router.navigateByUrl("/Dashboard");       
  }));
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
  it('returns associate response', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    const mockResponse: any = require('../../assets/associates.json');
    const associateService = TestBed.get(AssociateService);
    associateService.getAssociates().subscribe(
      data => {
        expect(data.length).toBe(5);
        expect(data[0].id).toEqual(1);
      }
    );
    const req = httpMock.expectOne(Constants.ASSOCIATE_API_ENDPOINT+'associates');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
    httpMock.verify();
  }));
  it('should create the dashboard component', async(() => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should have header', async(() => {
    expect(fixture.debugElement.nativeElement.querySelector('h1').textContent).toContain('Employee Skill Set Tracker - Dashboard');    
  }));
});

function advance(f: ComponentFixture<any>) {
  tick();
  f.detectChanges();
}
