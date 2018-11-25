export class GaugeDataUtil {
  static prepare(values: number[]) {
    let min = 0;
    let max = 0;

    for (const value of values) {
      if (min > value) min = value;
      if (max < value) max = value;
    }

    console.log({min, max, value: values[values.length - 1]});
    return {min, max, value: values[values.length - 1]};
  }
}
