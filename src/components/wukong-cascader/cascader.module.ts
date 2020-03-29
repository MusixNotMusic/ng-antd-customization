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

import { WukongCascaderOptionComponent } from './cascader-li.component';
import { WukongCascaderComponent } from './cascader.component';
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
    NzOverlayModule
  ],
  declarations: [WukongCascaderComponent, WukongCascaderOptionComponent, SearchFilterPipe],
  exports: [WukongCascaderComponent]
})
export class WukongCascaderModule {}
