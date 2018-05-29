import { Component, OnInit } from '@angular/core';

import { SkillService } from '../services/skill.service';
import { CommonService } from '../services/common.service';

import { Skill } from '../model/skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})

export class SkillComponent implements OnInit {

  skills: Skill[] = [];
  newskill: string = '';
  isEditMode: boolean = false;
  selectedSkill: Skill = new Skill(null,null);

  constructor(private _skillService: SkillService, private _commonService: CommonService) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this._skillService.getSkills().subscribe((data) => {
        this.skills = data;
      }
    );
  }

  delete(id:number): void {
    this._skillService.deleteSkill(id).subscribe(() => {
      this.skills.splice(this._commonService.getIndexById(id,this.skills), 1);
    });
  }

  add(): void {
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
      });
    }
  }

  edit(id:number) : void {
    this.isEditMode = true;
    this.selectedSkill = this._commonService.getObjectById(id, this.skills);
    this.newskill = this.selectedSkill.name;
  }

  cancel(): void {
    this.isEditMode = false;
    this.selectedSkill = new Skill(null, null);
    this.newskill = '';
  }

  update() : void {
    var editSkillFound = false;
    this.skills.forEach(skill => {
      if(skill.name.toLowerCase() == this.newskill.toLowerCase()){
        editSkillFound = true;
        return;
      }
    });
    if(!editSkillFound){
      this.selectedSkill.name = this.newskill;
      this._skillService.editSkill(this.selectedSkill).subscribe((data) => {
        this.newskill = '';
        this.skills.splice(this._commonService.getIndexById(this.selectedSkill.id, this.skills),1);
        this.skills.push(data);
        this.isEditMode = false;
        this.selectedSkill = new Skill(null, null);
      });
    }
  }

}
