import { TestBed, async, fakeAsync, tick, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgModule, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router, Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

//import components
import { AppComponent } from '../app.component';
import { AssociateComponent } from '../associate/associate.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { SkillComponent } from '../skill/skill.component'
import { routing } from '../router/routing.module';
//import model
import { Skill } from '../model/skill';
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

describe('SkillComponent - retrieve', () => {
  
  //Typescript declarations.
    let comp: SkillComponent;
    let fixture: ComponentFixture<SkillComponent>;
    let de: DebugElement;
    let element: HTMLElement;
    let mockSkills: Skill[];
    let mockSkill: Skill;
    let skillService: SkillService;
    let spy: jasmine.Spy;
    let spyOnAdd: jasmine.Spy;
    let spyOnDelete: jasmine.Spy;
    let location: Location;
    let router: Router;
    let inputTitle: HTMLInputElement;
  
    // beforeEach is called once before every `it` block in a test.
    // Use this to configure to the component, inject services etc.
    
    beforeEach(async(() => { //async before is used for compiling external templates which is any async activity
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
      providers: [AssociateService, SkillService, CommonService,  {provide: APP_BASE_HREF, useValue : '/Skill' }]
    }).compileComponents();      
      // compile template and css
    }));
  
    beforeEach(()=> { 
      // get the router from the testing NgModule
      router = TestBed.get(Router);
      // get the location from the testing NgModule,
      // which is a SpyLocation that comes from RouterTestingModule
      location = TestBed.get(Location);
      // compile the root component of the app
      fixture = TestBed.createComponent(SkillComponent);
      router.navigateByUrl("/Skill");
      //And here is the synchronous async function
     
      fixture = TestBed.createComponent(SkillComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('.container-fluid'));
      element  = de.nativeElement;
  
      //get the injected service from component's fixture.debugElement
      //if the service doesn't have a dependency, you can try Testbed.get()
      skillService = fixture.debugElement.injector.get(SkillService);
      
      mockSkills = require('../../assets/skills.json');
      spy = spyOn(skillService, 'getSkills').and.returnValue(of(mockSkills));    
      
    });
        
    afterEach(() => {
      fixture.destroy();
    });
  
    it('should have a Component',()=> {
      expect(comp).toBeTruthy();
    });
  
    it('should have header Add skill', async(() => {
      expect(fixture.debugElement.nativeElement.querySelector('h3').textContent).toContain('Add Skill');    
    })); 
    
    it('should have a div to display the skills', () => {
      expect(element.innerHTML).toContain("form-group row"); 
      expect(element.querySelector("div.form-group.row").textContent).toBeNull;     
    })
  
    it('should not show the skills before OnInit', () => {
      this.div = element.querySelector("div.form-group.row");
      //If you are curious about the replace() method, try the test without it
      expect(this.div.innerText.replace(/\s\s+/g, '')).toBe("", "div should be empty");
      expect(spy.calls.any()).toBe(false, "Spy shouldn't be yet called");
    });
  
    it('should still not show skills after component initialized', () => {
      fixture.detectChanges();
     // getSkills service is async => still has not returned with the paste
      expect(this.div.innerText.replace(/\s\s+/g, '')).toBe("", 'div should still be empty');
      expect(spy.calls.any()).toBe(true, 'getSkills should be called');
    });
  
    it('should show the list after skills promise resolves', async() => {
      fixture.detectChanges();      
      fixture.whenStable().then( () => {
          fixture.detectChanges();
          expect(comp.skills).toEqual(jasmine.objectContaining(mockSkills));          
          expect(element.innerText.replace(/\s\s+/g, ' ')).toContain(mockSkills[0].name.toUpperCase());
      });
    });  

    describe('SkillComponent-Add', () => {
      beforeEach(()=> { 
        fixture.detectChanges();
        mockSkill = { id:6, name: "jasmine/karma"}; 
        //Create a jasmine spy to spy on the addSkill method
        spyOnAdd = spyOn(skillService,"addSkill").and.returnValue(of(mockSkill));           
      });
    
      it("should accept input skill", async() => {
        //Query the input selectors
        inputTitle = element.querySelector("input");
        //Set the input element's value to mockPaste
        inputTitle.value = mockSkill.name;
        comp.newskill = inputTitle.value;      
        //Dispatch an event to tell the component input value has changed
        inputTitle.dispatchEvent(new Event("input"));
        expect(mockSkill.name).toEqual(comp.newskill);          
      });

      it("should add the skill", async() => { 
        comp.skills = mockSkills;  
        comp.newskill = mockSkill.name;
        comp.add();
        fixture.detectChanges();
        fixture.whenStable().then( () => {
            fixture.detectChanges();
            expect(spyOnAdd.calls.any()).toBeTruthy();
            expect(element.innerText.replace(/\s\s+/g, ' ')).toContain(mockSkills[5].name.toUpperCase());
        });
      });    
    });
  
    describe('SkillComponent-Delete', () => {
      beforeEach(()=> { 
        fixture.detectChanges();
        mockSkill = { id:6, name: "jasmine/karma"};      
        //Create a jasmine spy to spy on the addSkill method
        spyOnDelete = spyOn(skillService,"deleteSkill").and.returnValue(of(mockSkill));      
      });
    
      it("should remove the skill", async() => { 
        comp.skills = mockSkills;        
        comp.delete(4);
        fixture.detectChanges();
        fixture.whenStable().then( () => {
            fixture.detectChanges();
            expect(spyOnDelete.calls.any()).toBeTruthy();
            expect(mockSkills.length).toEqual(4);            
        });
      });
    });
});