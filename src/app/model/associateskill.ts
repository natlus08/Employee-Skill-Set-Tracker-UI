import { Skill } from './skill'

export class AssociateSkill {
  constructor(
    public id:number,
    public level:number,
    public skill: Skill
  ) {  }
}
