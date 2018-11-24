import { StoreId, StoreItemType } from './store.interface';

export enum MeasurementTypes {
  weight = 'weight',
  temperature = 'temperature',
  glucose = 'glucose',
}

export interface Measurement extends StoreItemType {
  id: StoreId;
  type: MeasurementTypes;
  time: number;
  image: string;
  value: number;
}

export interface MeasurementParams {
  skip: number;
  limit: number;
  type: string;
}
