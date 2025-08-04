import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css'],
})
export class GraficoBarraHorizontalComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit
{
  @Input() series: ApexAxisChartSeries = [];
  @Input() categories: string[] = [];
  @Input() colors: string[] = [
    '#008FFB',
    '#00E396',
    '#FEB019',
    '#FF4560',
    '#775DD0',
  ];

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() responsive: boolean = true;
  @Input() animations: boolean = true;

  chart!: ApexCharts;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderBarChart();
      window.addEventListener('resize', this.handleResize);
    }, 100);
  }

  handleResize = () => {
    if (this.chart) {
      this.chart.updateOptions(
        { chart: { width: '100%' } },
        false, // redraw
        true // animate
      );
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.chart &&
      (changes['series'] || changes['categories'] || changes['colors'])
    ) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  renderBarChart(): void {
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        animations: {
          enabled: this.animations,
          easing: 'easeinout',
          speed: 800,
        },
      },
      colors: this.colors,
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      title: {
        text: this.title,
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
      subtitle: {
        text: this.subtitle,
        align: 'center',
        style: {
          fontSize: '12px',
          color: '#666',
        },
      },
      series: this.series,
      xaxis: {
        categories: this.categories,
      },
      responsive: this.responsive
        ? [
            {
              breakpoint: 768,
              options: {
                chart: {
                  height: 250,
                },
                plotOptions: {
                  bar: {
                    columnWidth: '80%',
                  },
                },
              },
            },
            {
              breakpoint: 480,
              options: {
                chart: {
                  height: 200,
                },
                plotOptions: {
                  bar: {
                    columnWidth: '90%',
                  },
                },
              },
            },
          ]
        : [],
    };

    this.chart = new ApexCharts(this.chartContainer.nativeElement, options);
    this.chart.render();
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.updateOptions({
        series: this.series,
        xaxis: {
          categories: this.categories,
        },
        colors: this.colors,
      });
    }
  }

  public updateData(newSeries: any[], newCategories?: string[]): void {
    this.series = newSeries;
    if (newCategories) {
      this.categories = newCategories;
    }
    this.updateChart();
  }

  public exportChart(format: 'png' | 'svg' | 'csv' = 'png'): void {
    if (this.chart) {
      this.chart.dataURI().then((uri: any) => {
        const link = document.createElement('a');
        link.href = uri.imgURI;
        link.download = `grafico.${format}`;
        link.click();
      });
    }
  }
}
