/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { NzCascaderOption } from './typings';
import { NzCascaderService } from './cascader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[wukong-cascader-option]',
  exportAs: 'wukongCascaderOption',
  template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template [ngTemplateOutlet]="optionTemplate" [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <span class="wukong-node-status" (click)="checkedOptionClick($event)">{{option.status}}</span>
      <span [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'wukong-cascader-menu-item-keyword'"></span>
    </ng-template>
    <span *ngIf="!option.isLeaf || option.children?.length || option.loading" class="wukong-cascader-menu-item-expand-icon">
      <i nz-icon [nzType]="option.loading ? 'loading' : 'right'"></i>
    </span>
  `,
  host: {
    '[attr.title]': 'option.title || optionLabel',
    '[class.wukong-cascader-menu-item-active]': 'activated',
    '[class.wukong-cascader-menu-item-expand]': '!option.isLeaf',
    '[class.wukong-cascader-menu-item-disabled]': 'option.disabled'
  },
  providers: [
    NzCascaderService
  ],
})
export class WukongCascaderOptionComponent implements OnInit{
  @Input() optionTemplate: TemplateRef<NzCascaderOption> | null = null;
  @Input() option: NzCascaderOption;
  @Input() activated = false;
  @Input() highlightText: string;
  @Input() nzLabelProperty = 'label';
  @Input() columnIndex: number;
  private srv;

  @Output() readonly checkedClick = new EventEmitter<NzCascaderOption>();

  constructor(private cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2, public cascaderService: NzCascaderService) {
    this.srv = cascaderService;
    renderer.addClass(elementRef.nativeElement, 'wukong-cascader-menu-item');
  }

  ngOnInit(): void {
    // this.option.checked = !!this.option.checked;
    // console.log('ngOnInit ==>', this.option);
  }

  get optionLabel(): string {
    return this.option[this.nzLabelProperty];
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
  
  // checkedOptionClick(event: Event): void{
  //   console.log('checkedOptionClick');
  //   if(event) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   let isChecked = false;
  //   if(!this.option.status || this.option.status === 0 || this.option.status === 1) {
  //     this.option.status = 2;
  //     isChecked = true;
  //   } else if(this.option.status === 2) {
  //     this.option.status = 0;
  //     isChecked = false;
  //   }
  //   this.srv.setChecedChain(this.option, isChecked);
  // }

  checkedOptionClick(event: Event): void{
    console.log('checkedOptionClick');
    if(event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.checkedClick.emit(this.option);
  }
}
