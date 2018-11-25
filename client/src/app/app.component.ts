import { BehaviorSubject } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataUtil } from '../utils/data.util';
import { API_HOST } from '../configuration';
import { MeasurementType } from '../enums/measurement-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  glucose = new BehaviorSubject({labels: [], values: []});
  thermo = new BehaviorSubject({labels: [], values: []});
  weight = new BehaviorSubject({labels: [], values: []});

  constructor(private http: HttpClient) {
    this.http.get(`${API_HOST}/api/measurements`).subscribe((response: any[]) => {
      this.glucose.next(DataUtil.prepare(response, MeasurementType.GLUCOSE));
      this.thermo.next(DataUtil.prepare(response, MeasurementType.THERMO));
      this.weight.next(DataUtil.prepare(response, MeasurementType.WEIGHT));
    });
  }
}
