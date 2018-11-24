import { BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GradientUtil } from '../../utils/gradient.util';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  options: any = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: '#CCD1D9',
        },
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }],
      yAxes: [{
        gridLines: {
          color: '#CCD1D9',
        },
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    },
    elements: {
      line: {
        borderColor: '#b00035',
        borderWidth: 2,
      },
      point: {
        borderColor: '#b00035',
        borderWidth: 2,
        radius: 4,
        hoverRadius: 4
      }
    },
  };

  chartData: BehaviorSubject<{ labels: string[], datasets: { data: number[], backgroundColor?: CanvasGradient }[] }> = new BehaviorSubject({
    labels: [],
    datasets: [],
  });

  @Input() set data(data: { values: number[], labels: string[] }) {
    const gradient = new GradientUtil().generate('rgba(249, 74, 58, 1)', 'rgba(229, 47, 101, 1)');
    this.chartData.next({labels: data.labels, datasets: [{data: data.values, backgroundColor: gradient}]});
  }
}
