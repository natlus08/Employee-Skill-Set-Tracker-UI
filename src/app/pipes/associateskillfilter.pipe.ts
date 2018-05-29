import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateskillfilter'
})

export class AssociateSkillFilter implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.skill.name.toLowerCase().includes(searchText);
    });
  }
}
