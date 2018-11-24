import { Input, NgModule } from '@angular/core';

import { LineChartComponent } from './line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
  ],
  declarations: [LineChartComponent],
  exports: [LineChartComponent]
})
export class LineChartModule {
}
