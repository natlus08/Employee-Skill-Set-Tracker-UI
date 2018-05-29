import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AssociateService } from '../services/associate.service';
import { SkillService } from '../services/skill.service';

import { Associate } from '../model/associate';
import { Skill } from '../model/skill';
import { AssociateSkill } from '../model/associateskill';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})

export class AssociateComponent implements OnInit {

  isEdit: boolean = false;
  isView: boolean = false;
  isAdd: boolean = false;
  associate: Associate = new Associate(null,'','M','',null,[],'','','','','',[]);
  skills: Skill[] = [];
  associateSkills: AssociateSkill[] = [];
  newskill: string = '';

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
    else {
      this.getSkills();
    }
  }

  getAssociate(id:number): void {
    this._associateService.getAssociate(id).subscribe((data) => {
        this.associate = data;
        this.getSkills();
      }
    );
  }

  getSkills(): void {
    this._skillService.getSkills().subscribe((data) => {
        this.skills = data;
        this.mapAssociateSkillLevel(data);
      }
    );
  }

  mapAssociateSkillLevel(skills: Skill[]): void {
    skills.forEach(skill => {
      var skillAdded = false;
      this.associate.skills.forEach(associateSkill => {
        if(associateSkill.skill.id == skill.id){
          this.associateSkills.push(associateSkill);
          skillAdded = true;
          return;
        }
      });
      if (!skillAdded) {
        this.associateSkills.push(new AssociateSkill(null,null,skill));
      }
    });
  }

  addSkill(): void {
    var skillExists = false;
    this.skills.forEach(skill => {
      if(skill.name.toLowerCase() == this.newskill.toLowerCase()){
        skillExists = true;
        return;
      }
    });
    if(!skillExists){
      let newSkillObj: Skill = new Skill(null,this.newskill);
      this._skillService.addSkill(newSkillObj).subscribe((data) => {
        this.newskill = '';
        this.skills.push(data);
        this.associateSkills.push(new AssociateSkill(null,null,data))
      });
    }
  }

  reset(): void {
    this.associate = new Associate(null,'','M','',null,[],'','','','','',[]);
    this.associateSkills.forEach(associateSkill => {
      associateSkill.level = null;
    });
  }

  addAssociate(): void {
    this.associate.skills = [];
    this.associateSkills.forEach(associateSkill => {
      if (associateSkill.level && associateSkill.level > 0) {
        this.associate.skills.push(associateSkill);
      }
    });
    this._associateService.addAssociate(this.associate).subscribe(() => {
      this.router.navigate(['/View']);
    });
  }

}
