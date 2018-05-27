import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import components
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './addemployee/addemployee.component'
import { EditEmployeeComponent } from './editemployee/editemployee.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SkillComponent } from './skill/skill.component'
import { routing } from './router/routing.module';
//import services
import { AssociateService } from './services/associate.service'
import { CommonService } from './services/common.service'
//import pipes
import { NameFilter } from './pipes/namefilter.pipe';
import { IdFilter } from './pipes/idfilter.pipe';
import { EmailFilter } from './pipes/emailfilter.pipe';
import { MobileFilter } from './pipes/mobilefilter.pipe';
import { SkillFilter } from './pipes/skillfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DashboardComponent,
    SkillComponent,
    NameFilter,
    IdFilter,
    EmailFilter,
    MobileFilter,
    SkillFilter
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [AssociateService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
