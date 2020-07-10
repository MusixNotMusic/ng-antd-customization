import { Injectable } from '@angular/core';
import { CustomSelectComponent } from './custom-select.component';

@Injectable()
export class CustomDropdownService {

  private select: CustomSelectComponent;
  public optionList: any;

  public register(select: CustomSelectComponent) {
    this.select = select;
  }

  public setOptionList( list ) {
    this.optionList = list;
  }

  public getOptionList() {
    return this.optionList;
  }

  public getSelect(): CustomSelectComponent {
    return this.select;
  }

  public pushNewOption(key) {
    this.optionList.push({[this.select.label]: key, [this.select.value]: key, hidden: false})
  }
}