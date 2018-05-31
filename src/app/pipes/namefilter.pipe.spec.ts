import { TestBed, async } from '@angular/core/testing';
//import pipes
import { NameFilter } from '../pipes/namefilter.pipe';
describe('Pipe: NameFilter', () => {
  let pipe: NameFilter;
  let data: any[];

  beforeEach(() => {
    pipe = new NameFilter();
    data = [
      {
          "id": 1,
          "name": "java"
      },
      {
          "id": 2,
          "name": "angular"
      }];
  });

  it('name pipe should work', async(() => {
    expect(pipe.transform(data, 'jav').length).toEqual(1);
  }));

});