import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaugeChartComponent {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 50;
  @Input() label = 'label';
  @Input() cssClass = 'red';
}
