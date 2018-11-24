import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GaugeModule } from 'angular-gauge';
import { GaugeChartComponent } from './gauge-chart.component';

@NgModule({
  imports: [
    CommonModule,
    GaugeModule.forRoot(),
  ],
  declarations: [GaugeChartComponent],
  exports: [GaugeChartComponent]
})
export class GaugeChartModule {
}
