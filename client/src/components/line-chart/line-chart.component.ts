import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  lineChartOptions: any = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(255, 255, 255, .1)',
        },
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(255, 255, 255, .1)',
        },
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  };

  lineChartStyle: any[] = [
    {
      backgroundColor: 'rgba(252,110,81,.5)',
      borderColor: 'rgba(252,110,81,1)',
      borderWidth: 2,

      pointBackgroundColor: 'rgba(19,19,21,1)',
      pointBorderColor: 'rgba(252,110,81,1)',
      pointHoverBackgroundColor: 'rgba(252,110,81,1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointBorderWidth: 2,
      pointRadius: 6,
    }
  ];

  chartValues: BehaviorSubject<{ data: number[] }[]> = new BehaviorSubject([{data: []}]);
  chartLabels: BehaviorSubject<string[]> = new BehaviorSubject([]);

  @Input() set data(data: { values: number[], labels: string[] }) {
    this.chartValues.next([{data: data.values}]);
    this.chartLabels.next(data.labels);
  }

  randomize(): void {
    const _lineChartData: any[] = new Array(this.chartValues.value.length);
    for (let i = 0; i < this.chartValues.value.length; i++) {
      _lineChartData[i] = {data: new Array(this.chartValues.value[i].data.length)};
      for (let j = 0; j < this.chartValues.value[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.chartValues.next(_lineChartData);
  }
}
