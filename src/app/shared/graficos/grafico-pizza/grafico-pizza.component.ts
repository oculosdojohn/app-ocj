import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
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
  selector: 'app-grafico-pizza',
  templateUrl: './grafico-pizza.component.html',
  styleUrls: ['./grafico-pizza.component.css'],
})
export class GraficoPizzaComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit
{
  @Input() series: number[] = [];
  @Input() categories: string[] = [];
  @Input() labels: string[] = [];
  @Input() colors: string[] = [
    '#5C6BC0', // azul indigo
    '#29B6F6', // azul claro
    '#67BB6A', // verde
    '#FAD53F', // amarelo
    '#FFA726', // laranja

    '#EF5350', // vermelho suave
    '#AB47BC', // roxo médio
    '#26C6DA', // ciano claro
    '#EC407A', // rosa vibrante
    '#66BB6A', // verde vivo

    '#FF7043', // laranja queimado
    '#42A5F5', // azul médio
    '#9CCC65', // verde limão
    '#FFCA28', // amarelo dourado
    '#8D6E63', // marrom acinzentado
  ];

  @Input() colorPalette: string = 'palette1';

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() responsive: boolean = true;
  @Input() animations: boolean = true;
  @Input() showLegend: boolean = true;
  @Input() legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() donutSize: string = '65%';
  @Input() height: number = 380;
  @Input() tooltipFormatter?: (val: number) => string;

  chart!: ApexCharts;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderPieChart();
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

  renderPieChart(): void {
    const options = {
      chart: {
        type: 'pie', // <-- alterado para pie
        height: this.height,
        width: '100%',
        animations: {
          enabled: this.animations,
          easing: 'easeinout',
          speed: 800,
        },
      },
      series: this.series,
      labels: this.labels,
      ...(this.colors.length > 0
        ? { colors: this.colors }
        : {
            theme: {
              palette: this.colorPalette,
            },
          }),
      colors: this.colors,
      plotOptions: {
        pie: {
          // Remova a configuração de donut
        },
      },
      dataLabels: {
        enabled: false,
        formatter: (val: number) => {
          return Math.round(val) + '%';
        },
        style: {
          fontSize: '14px',
          fontWeight: 'medium',
        },
      },
      legend: {
        show: this.showLegend,
        position: this.legendPosition,
        horizontalAlign: 'center',
        fontSize: '12px',
        markers: {
          width: 12,
          height: 12,
          radius: 2,
        },
        itemMargin: {
          horizontal: 5,
          vertical: 5,
        },
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
      tooltip: {
        enabled: true,
        y: {
          formatter: this.tooltipFormatter
            ? this.tooltipFormatter
            : (val: number) => val.toString(),
        },
      },
      responsive: this.responsive
        ? [
            {
              breakpoint: 768,
              options: {
                chart: {
                  height: 300,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
            {
              breakpoint: 480,
              options: {
                chart: {
                  height: 250,
                },
                legend: {
                  position: 'bottom',
                  fontSize: '10px',
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
      const updateOptions: any = {
        series: this.series,
        labels: this.labels,
      };

      if (this.colors.length > 0) {
        updateOptions.colors = this.colors;
      } else {
        updateOptions.theme = {
          palette: this.colorPalette,
        };
      }

      this.chart.updateOptions(updateOptions);
    }
  }

  public updateData(newSeries: number[], newLabels?: string[]): void {
    this.series = newSeries;
    if (newLabels) {
      this.labels = newLabels;
    }
    this.updateChart();
  }

  public exportChart(format: 'png' | 'svg' | 'csv' = 'png'): void {
    if (this.chart) {
      this.chart.dataURI().then((uri: any) => {
        const link = document.createElement('a');
        link.href = uri.imgURI;
        link.download = `grafico-rosquinha.${format}`;
        link.click();
      });
    }
  }

  get totalValue(): number {
    return this.series.reduce((sum: number, value: number) => sum + value, 0);
  }
}
