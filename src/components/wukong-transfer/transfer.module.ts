import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from '../select/nz-select.module';

import { WukongTransferComponent } from './transfer.component';
import { SearchFilterPipe } from './search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
  ],
  declarations: [WukongTransferComponent, SearchFilterPipe],
  exports: [WukongTransferComponent]
})
export class WukongTransferModule {}
