import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, fieldName: string, hasSearch: boolean = false, result ?: any): any[] {
    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchText || !hasSearch) { 
      if(result) {
        result.data = items;
      }
      return items; 
    }

    // convert the searchText to lower case
    // searchText = searchText.toLowerCase();

    // retrun the filtered array
    let arr =items.filter(item => {
      if (item && item[fieldName]) {
        return item[fieldName].includes(searchText);
      }
      return false;
    });
    console.log('SearchFilterPipe ==>', result);
    if(result) {
      result.data = arr;
    }
    return arr;
   }
}