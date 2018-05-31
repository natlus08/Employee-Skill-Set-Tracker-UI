import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import components
import { AppComponent } from './app.component';
import { AssociateComponent } from './associate/associate.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SkillComponent } from './skill/skill.component'
import { routing } from './router/routing.module';
//import services
import { AssociateService } from './services/associate.service'
import { SkillService } from './services/skill.service'
import { CommonService } from './services/common.service'
//import pipes
import { NameFilter } from './pipes/namefilter.pipe';
import { IdFilter } from './pipes/idfilter.pipe';
import { EmailFilter } from './pipes/emailfilter.pipe';
import { MobileFilter } from './pipes/mobilefilter.pipe';
import { SkillFilter } from './pipes/skillfilter.pipe';
import { AssociateSkillFilter } from './pipes/associateskillfilter.pipe';

@NgModule({
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
  providers: [AssociateService, SkillService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
