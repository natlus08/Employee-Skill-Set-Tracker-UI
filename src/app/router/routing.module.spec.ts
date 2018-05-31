import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
//import components
import { AppComponent } from '../app.component';
import { AssociateComponent } from '../associate/associate.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { SkillComponent } from '../skill/skill.component'
import { routes } from '../router/routing.module';
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

describe('Routing Module', () => {
  let location: Location;
  let router: Router;
  let fixture;  
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
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [AssociateService, SkillService, CommonService]
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(SkillComponent); 
    router.initialNavigation();   
  }));
  it('navigate to "" redirects you to /Dashboard', fakeAsync(() => { 
    router.navigate(['']); 
    tick(); 
    expect(location.path()).toBe('/Dashboard'); 
  }));
  it('navigate to Dashboard redirects you to /Dashboard', fakeAsync(() => { 
    router.navigate(['/Dashboard']); 
    tick(); 
    expect(location.path()).toBe('/Dashboard'); 
  }));
  it('navigate to Skill takes you to /Skill', fakeAsync(() => {
    router.navigate(['/Skill']);
    tick(50);
    expect(location.path()).toBe('/Skill');
  }));
  it('navigate to Add takes you to /Add', fakeAsync(() => {
    router.navigate(['/Add']);
    tick(50);
    expect(location.path()).toBe('/Add');
  }));
  it('navigate to Edit takes you to /Edit', fakeAsync(() => {
    router.navigate(['/Edit/0']);
    tick(50);
    expect(location.path()).toBe('/Edit/0');
  }));
  it('navigate to View takes you to /View', fakeAsync(() => {
    router.navigate(['/View/0']);
    tick(50);
    expect(location.path()).toBe('/View/0');
  }));
});
