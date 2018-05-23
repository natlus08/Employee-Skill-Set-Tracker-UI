import { NgModule } from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmployeeComponent } from '../addemployee/addemployee.component'
import { EditEmployeeComponent } from '../editemployee/editemployee.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { SkillComponent } from '../skill/skill.component'

const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Edit/:index', component: EditEmployeeComponent },
  { path: 'Add', component: AddEmployeeComponent },
  { path: 'Skill', component: SkillComponent },
  { path: '**', redirectTo: 'Dashboard'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
