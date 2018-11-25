import { BehaviorSubject } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataUtil } from '../utils/data.util';
import { API_HOST } from '../configuration';
import { MeasurementType } from '../enums/measurement-type.enum';

import isEqual from 'lodash/isEqual';
import { GaugeDataUtil } from '../utils/gauge-data.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  glucose = new BehaviorSubject({labels: [], values: []});
  temperature = new BehaviorSubject({labels: [], values: []});
  weight = new BehaviorSubject({labels: [], values: []});

  glucoseGauge = new BehaviorSubject({min: 0, max: 100, value: 0});
  temperatureGauge = new BehaviorSubject({min: 0, max: 100, value: 0});
  weightGauge = new BehaviorSubject({min: 0, max: 100, value: 0});

  constructor(private http: HttpClient) {
    this.loop();
  }

  loop = () => {
    this.http.get(`${API_HOST}/api/measurements`).subscribe((response: any[]) => {
      const glucose = DataUtil.prepare(response, MeasurementType.GLUCOSE);
      if (!isEqual(glucose, this.glucose.value)) {
        this.glucose.next(glucose);
        this.glucoseGauge.next(GaugeDataUtil.prepare(glucose.values));
      }

      const temperature = DataUtil.prepare(response, MeasurementType.TEMPERATURE);
      if (!isEqual(temperature, this.temperature.value)) {
        this.temperature.next(temperature);
        this.temperatureGauge.next(GaugeDataUtil.prepare(temperature.values));
      }

      const weight = DataUtil.prepare(response, MeasurementType.WEIGHT);
      if (!isEqual(weight, this.weight.value)) {
        this.weight.next(weight);
        this.weightGauge.next(GaugeDataUtil.prepare(weight.values));
      }

      setTimeout(this.loop, 1000);
    });
  };
}
