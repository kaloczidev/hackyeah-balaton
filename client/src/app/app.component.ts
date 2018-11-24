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
  data = new BehaviorSubject({labels: [], values: []});

  constructor(private http: HttpClient) {
    this.http.get(`${API_HOST}/api/measurements`).subscribe((response: any[]) => {
      const data = DataUtil.prepare(response, MeasurementType.GLUCOSE);
      this.data.next(data);
      console.log(response, data);
    });
  }
}
