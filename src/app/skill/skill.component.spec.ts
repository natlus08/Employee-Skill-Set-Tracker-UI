import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

describe('SkillComponent', () => {
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
        routing
      ],
      providers: [AssociateService, SkillService, CommonService,  {provide: APP_BASE_HREF, useValue : '/Skill' }]
    }).compileComponents();    
  }));
  it('should create the skill component', async(() => {
    const fixture = TestBed.createComponent(SkillComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*it(`should have as title 'Employee Skillset Tracker'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Employee Skillset Tracker');
  }));
  it('should render add skill in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;     
    expect(compiled.querySelector('h3').textContent).toContain('Add Skill');
  }));*/  
});