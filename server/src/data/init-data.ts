import { Measurement, MeasurementTypes } from '../interfaces/measurement.interface';

export const measurements: Array<Measurement> = [
  {
    id: 0,
    type: MeasurementTypes.weight,
    time: 1543075719394,
    image: 'd',
    value: 87
  },
  {
    id: 1,
    type: MeasurementTypes.weight,
    time: 1543075739394,
    image: 'd',
    value: 76
  },
  {
    id: 2,
    type: MeasurementTypes.glucose,
    time: 1543075729394,
    image: 'd',
    value: 11
  },
  {
    id: 3,
    type: MeasurementTypes.glucose,
    time: 1543075719394,
    image: 'd',
    value: 8
  },
];
