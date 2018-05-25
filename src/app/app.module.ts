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
//import pipes

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DashboardComponent,
    SkillComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [AssociateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
