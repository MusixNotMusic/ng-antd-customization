import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChild
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomDropdownService } from './custom-dropdown.service';
import { CustomSelectOptionComponent } from './custom-select-option.component';
import { DropdownComponent } from './dropdown.component';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.html',
  styleUrls: ['./_custom-select.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    },
    CustomDropdownService
  ]
})
export class CustomSelectComponent implements AfterViewInit, ControlValueAccessor {

  @Input()
  public label: string;

  @Input()
  public placeholder: string;

  @Input()
  public selected: string;

  @Input()
  public optionList: any;

  public prevSelectedOption: any;

  @Input()
  public required = false;

  @Input()
  public disabled = false;

  @ViewChild('input')
  public input: ElementRef;

  @ViewChild(DropdownComponent)
  public dropdown: DropdownComponent;

  @ContentChildren(CustomSelectOptionComponent)
  public options: QueryList<CustomSelectOptionComponent>;

  public selectedOption: CustomSelectOptionComponent;

  public displayText: string;

  public onChangeFn = (_: any) => {};
  @Output() public onSelected = new EventEmitter<Object>();
  
  public onTouchedFn = () => {};

  private keyManager: ActiveDescendantKeyManager<CustomSelectOptionComponent>;

  scrolledIndex: number;

  @ViewChild('scrollComponent')
  private _scrollViewport: CdkVirtualScrollViewport;

  constructor(private dropdownService: CustomDropdownService) {
    this.dropdownService.register(this);
    this.dropdownService.setOptionList(this.optionList);
  }

  public ngAfterViewInit() {
    (window as any)._dropdown = this;
    setTimeout(() => {
      this.selectedOption = this.options.toArray().find(option => option.value === this.selected);
      this.displayText = this.selectedOption ? this.selectedOption.key : '';
      this.keyManager = new ActiveDescendantKeyManager(this.options)
        .withHorizontalOrientation('ltr')
        .withVerticalOrientation()
        .withWrap()
        .withTypeAhead(); // 支持搜索

        this.keyManager.change.next = (value) => { 
          let _value = value / 5 | 0;
          // console.log('this.keyManager.change' , this.scrolledIndex, _value);
          this._scrollViewport.scrollToIndex(_value, 'smooth');
        };
    });
  }

  public showDropdown() {
    // console.log('showDropdown ==>', this.dropdown);
    this.dropdown.show();

    if (!this.options.length) {
      return;
    }

    this.selected ? this.keyManager.setActiveItem(this.selectedOption) : this.keyManager.setFirstItemActive();
  }

  public hideDropdown() {
    this.dropdown.hide();
  }

  public onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        return;
      }

      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === 'Enter' || event.key === ' ') {
      this.setBeforePrevSelectOption();
      this.setSelectedOption(this.keyManager.activeItem);
      // this.selectedOption = this.keyManager.activeItem;
      // console.log('onKeyDown ==>', this.selectedOption.value);
      // this.selected = this.selectedOption.value;
      // this.displayText = this.selectedOption ? this.selectedOption.key : '';
      this.hideDropdown();
      this.onChange();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.dropdown.showing && this.hideDropdown();
    } else if (['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      console.log(`'Up', 'ArrowDown', 'Down'`, event);
      this.keyManager.onKeydown(event);
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      this.dropdown.showing && event.preventDefault();
    }
  }

  public selectOption(option: CustomSelectOptionComponent) {
    console.log('selectOption =>', option);
    this.keyManager.setActiveItem(option);
    // this.selected = option.value;
    // this.selectedOption = option;
    // this.displayText = this.selectedOption ? this.selectedOption.key : '';
    this.setBeforePrevSelectOption();
    this.setSelectedOption(option);
    this.hideDropdown();
    this.input.nativeElement.focus();
    this.onChange();
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.selected = obj;
  }

  public onTouched() {
    this.onTouchedFn();
  }

  public onChange() {
    this.onChangeFn(this.selected);
    // this.onSelected.emit(this.selected);
  }

  onScrolledIndexChange(index: number): void {
    this.scrolledIndex = index;
  }

  setBeforePrevSelectOption() {
    this.prevSelectedOption = this.selectedOption;
    if(this.prevSelectedOption) {
      this.prevSelectedOption.value.hidden = false;
    }
  }

  setSelectedOption(option) {
    option.value.hidden = true;
    this.selected = option.value;
    this.selectedOption = option;
    this.displayText = this.selectedOption ? this.selectedOption.key : '';
  }
}
