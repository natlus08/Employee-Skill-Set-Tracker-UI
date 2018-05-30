import { AssociateSkill } from './associateskill';

export class Associate {
  constructor(
    public id: number,
    public name: string,
    public gender: string,
    public email: string,
    public mobile: string,
    public image: string[],
    public status: string,
    public level: string,
    public remark: string,
    public strength: string,
    public weakness: string,
    public skills: AssociateSkill[]
  ) {  }
}
