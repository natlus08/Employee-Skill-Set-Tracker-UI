import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobilefilter'
})

export class MobileFilter implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.mobile.toString().toLowerCase().includes(searchText);
    });
  }
}
