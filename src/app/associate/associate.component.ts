import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AssociateService } from '../services/associate.service';
import { SkillService } from '../services/skill.service';

import { Associate } from '../model/associate';
import { Skill } from '../model/skill';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})

export class AssociateComponent implements OnInit {

  isEdit: boolean = false;
  isView: boolean = false;
  isAdd: boolean = false;
  associate: Associate = new Associate(0,'','','',0,[],'','','','','',[]);
  skills: Skill[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private _associateService: AssociateService,
              private _skillService: SkillService) { }

  ngOnInit() {
    var selectedId;
    this.route.url.subscribe(url => {
      if (url[0].path === 'View') {
        this.isView = true;
      }
      else if (url[0].path === 'Edit') {
        this.isEdit = true
      }
      else {
        this.isAdd = true;
      }
      return;
    });
    if (!this.isAdd) {
      this.route.params.subscribe(params => {
        selectedId =  +params['index'];
      });
      if (selectedId) {
        this.getAssociate(selectedId);
      }
    }
    this.getSkills();
  }

  getAssociate(id:number): void {
    this._associateService.getAssociate(id).subscribe((data) => {
        this.associate = data;
      }
    );
  }

  getSkills(): void {
    this._skillService.getSkills().subscribe((data) => {
        this.skills = data;
      }
    );
  }
}
