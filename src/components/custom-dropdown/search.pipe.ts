import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, fieldName: string, hasSearch: boolean = false, hiddenFilter ?: string): any[] {
    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchText || !hasSearch) { return items; }

    // convert the searchText to lower case
    // searchText = searchText.toLowerCase();

    let callBack;
    if(hiddenFilter) {
      callBack = (item, index) => {
        if (item && item[fieldName] && item[hiddenFilter]) {
          return item[fieldName].includes(searchText);
        }
        return false;
      }
     } else {
       callBack = (item, index) => {
        if (item && item[fieldName]) {
          return item[fieldName].includes(searchText);
        }
        return false;
      }
     }
    // retrun the filtered array
    return items.filter(callBack);
   }
}