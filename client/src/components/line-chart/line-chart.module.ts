import { NgModule } from '@angular/core';

import { LineChartComponent } from './line-chart.component';
import { ChartModule } from 'angular2-chartjs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
  ],
  declarations: [LineChartComponent],
  exports: [LineChartComponent]
})
export class LineChartModule {
}
