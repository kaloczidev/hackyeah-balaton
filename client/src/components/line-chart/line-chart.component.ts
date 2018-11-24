import { Component } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  public lineChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'weight'},
  ];

  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: any = {
    responsive: true,
  };

  public lineChartStyle: any[] = [
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
  public lineChartLegend = true;
  public lineChartType = 'line';

  public randomize(): void {
    const _lineChartData: any[] = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
