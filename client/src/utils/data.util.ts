import * as Moment from 'moment';

import { DATA_FORMAT } from '../configuration';
import { MeasurementType } from '../enums/measurement-type.enum';

export class DataUtil {
  static prepare(data: any[], type: MeasurementType) {
    const filteredData = {values: [], labels: []};

    for (const item of data)
      if (item.type === type) {
        filteredData.values.push(item.value);
        filteredData.labels.push(Moment(item.time).format(DATA_FORMAT));
      }

    return filteredData;
  }
}
