/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzHighlightModule } from '../core/highlight';
import { NzNoAnimationModule } from '../core/no-animation';
import { NzOutletModule } from '../core/outlet';
import { NzOverlayModule } from '../core/overlay';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CustomDropdownService } from './custom-dropdown.service';
import { CustomSelectOptionComponent } from './custom-select-option.component';
import { CustomSelectComponent } from './custom-select.component';
import { DropdownComponent } from './dropdown.component';
import { SearchFilterPipe } from './search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    NzOutletModule,
    NzHighlightModule,
    NzIconModule,
    NzNoAnimationModule,
    NzOverlayModule,
    PortalModule,
    ScrollDispatchModule
  ],
  providers: [CustomDropdownService],
  declarations: [CustomSelectOptionComponent, CustomSelectComponent, DropdownComponent, SearchFilterPipe],
  exports: [CustomSelectOptionComponent, CustomSelectComponent, DropdownComponent, SearchFilterPipe]
})
export class CustomDropdownModule {}
