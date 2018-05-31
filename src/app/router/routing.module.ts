import { NgModule } from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssociateComponent } from '../associate/associate.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { SkillComponent } from '../skill/skill.component'

export const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Edit/:index', component: AssociateComponent },
  { path: 'View/:index', component: AssociateComponent },
  { path: 'Add', component: AssociateComponent },
  { path: 'Skill', component: SkillComponent },
  { path: '**', redirectTo: 'Dashboard'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
