import { Component, OnInit } from '@angular/core';

import { AssociateService } from '../services/associate.service';
import { CommonService } from '../services/common.service';

import { Associate } from '../model/associate';
import { Dashboard } from '../model/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  associates:Associate[] = [];
  dashboard:Dashboard = new Dashboard(0,0,0,0,0,0,0,0,0,0);
  searchName: string = '';
  searchId: string = '';
  searchEmail: string = '';
  searchCell: string = '';
  searchSkill: string = '';
  groupBySkill: any[] = [];

  constructor(private _associateService: AssociateService, private _commonService: CommonService) { }

  ngOnInit() {
    this.getAssociates();
  }

  getAssociates(): void {
    this._associateService.getAssociates().subscribe((data) => {
        if(data != null){
          this.associates = data;
          this.computeDashboardData(data);
        }
      }
    );
  }

  computeDashboardData(associates: Associate[]): void {
    var maleAssociates = 0;
    var femaleAssociates = 0;
    var freshers = 0;
    var rated = 0;
    var ratedMale = 0;
    var ratedFemale = 0;
    var level2 = 0;
    var level3 = 0;
    var total = associates.length;
    associates.forEach(associate => {
      if (associate.gender === 'M') {
        maleAssociates++;
      }
      if (associate.gender === 'F') {
        femaleAssociates++;
      }
      if (associate.level === 'ONE') {
        freshers++;
      }
      if (associate.level === 'TWO' || associate.level === 'THREE') {
        rated++;
        if (associate.level === 'TWO'){
          level2++;
        }
        if (associate.level === 'THREE'){
          level3++;
        }
        if (associate.gender === 'M') {
          ratedMale++;
        }
        else {
          ratedFemale++;
        }
      }
      associate.skills.forEach(function (associateSkill) {
        this.groupBySkill[associateSkill.skill.name] = this.groupBySkill[associateSkill.skill.name] || [];
        this.groupBySkill[associateSkill.skill.name].push({ associate });
      });
    });
    this.dashboard = new Dashboard(total,this.getPercentage(total,femaleAssociates),this.getPercentage(total,maleAssociates),
      this.getPercentage(total,freshers),rated,this.getPercentage(rated,ratedMale),this.getPercentage(rated,ratedFemale),
      this.getPercentage(total,freshers),this.getPercentage(total,level2),this.getPercentage(total,level3));

    console.log(this.groupBySkill);
  }



  getPercentage(base:number, value:number): number {
    return ((Math.round((value/base)*100)));
  }

  clearFilters(): void {
    this.searchName = '';
    this.searchId = '';
    this.searchEmail = '';
    this.searchCell = '';
    this.searchSkill = '';
  }

  delete(id:number): void {
    this._associateService.deleteAssociate(id).subscribe(() => {
      this.associates.splice(this._commonService.getIndexById(id,this.associates), 1);
    });
  }

}
