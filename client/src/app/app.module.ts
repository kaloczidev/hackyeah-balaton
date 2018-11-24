import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LineChartModule } from '../components/line-chart/line-chart.module';
import { GaugeChartModule } from '../components/gauge-chart/gauge-chart.module';
import { BoxModule } from '../components/box/box.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    GaugeChartModule,
    HttpClientModule,
    BoxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
