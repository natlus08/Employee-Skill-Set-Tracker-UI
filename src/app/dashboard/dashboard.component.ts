import { Component, OnInit } from '@angular/core';

import { AssociateService } from '../services/associate.service'

import { Associate } from '../model/associate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public associates:Associate[] = [];

  constructor(private _associateService: AssociateService) { }

  ngOnInit() {
    this.getAssociates();
  }

  getAssociates(): void {
    this._associateService.getAssociates().subscribe((data) => {
        if(data != null){
          this.associates = data;
          var groupByGender = {};

          data.forEach(function (a) {
            groupByGender [a.gender] = groupByGender [a.gender] || [];
            groupByGender [a.gender].push({ gender: a.gender });
          });
          console.log(groupByGender)
        }
      }
    );
  }

}
