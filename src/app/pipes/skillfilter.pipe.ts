import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillfilter'
})

export class SkillFilter implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      var found = false;
      it.skills.forEach( associateSkill => {
        if ((associateSkill.level > 10) && associateSkill.skill.name.toLowerCase().includes(searchText)) {
          found = true;
          return;
        }
      });
      return found;
    });
  }
}
