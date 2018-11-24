import { Measure } from '../interfaces/measure.interface';
import { Type } from '../interfaces/type.interface';

export const types: Array<Type> = [
  {
    id: 1,
    name: 'Weight',
  },
  {
    id: 2,
    name: 'Glucose',
  },
];

export const measures: Array<Measure> = [
  {
    id: 0,
    type: types[0].id,
    time: 1543075719394,
    image: 'd',
    value: 87
  },
  {
    id: 1,
    type: types[0].id,
    time: 1543075739394,
    image: 'd',
    value: 76
  },
  {
    id: 2,
    type: types[1].id,
    time: 1543075729394,
    image: 'd',
    value: 11
  },
  {
    id: 3,
    type: types[1].id,
    time: 1543075719394,
    image: 'd',
    value: 8
  },
];
