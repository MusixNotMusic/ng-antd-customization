import { Highlightable } from '@angular/cdk/a11y';
import { Component, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { CustomDropdownService } from './custom-dropdown.service';
import { CustomSelectComponent } from './custom-select.component';

@Component({
  selector: 'custom-select-option',
  template: '{{key}}',
  styleUrls: ['./_custom-select-option.scss']
})
export class CustomSelectOptionComponent implements Highlightable {

  @Input()
  public key: string;

  @Input()
  public value: string | any;

  @Input()
  public option: string | any;

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.select.selectedOption === this;
  }

  @HostBinding('class.active')
  public active = false;
  
  private select: CustomSelectComponent;

  constructor(private dropdownService: CustomDropdownService) {
    this.select = this.dropdownService.getSelect();
    (window as any)._option = this;
  }

  public getLabel(): string {
    return this.key;
  }

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log('onClick ==>');
    this.select.selectOption(this);
  }
}
