import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../types/apexchart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  @Input() chartOptions!: Observable<ChartOptions>;
  options: ChartOptions = {} as ChartOptions;

  constructor() {}

  ngOnInit() {
    this.chartOptions.subscribe(res => {
      this.options = res;
      this.options = {
        ...this.options,
        chart: {
          ...this.options.chart,
          fontFamily: 'Poppins',
          foreColor: '#B6B5BB',
          height: 380,
          toolbar: {
            ...this.options.chart?.toolbar,
            show: false
          },
          redrawOnParentResize: true
        },
        dataLabels: {
          ...this.options.dataLabels
          ? this.options.dataLabels
          : { enabled: false },
        },
        title: {
          ...this.options.title,
          style: {
            ...this.options.title?.style,
            fontSize: '28px',
            fontFamily: 'Poppins',
            fontWeight: 600
          }
        },
        xaxis: {
          ...this.options.xaxis,
          labels: {
            ...this.options.xaxis?.labels,
            style: {
              ...this.options.xaxis?.labels?.style
              ? this.options.xaxis?.labels?.style
              : {
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 500,
                colors: '#000'
              }
            }
          },
        },
        yaxis: {
          ...this.options.yaxis,
          labels: {
            ...this.options.yaxis?.labels,
            style: {
              ...this.options.yaxis?.labels?.style
              ? this.options.xaxis?.labels?.style
              : {
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 500,
                colors: '#000'
              }
            },
          }
        },
        colors: this.options.colors
          ? this.options.colors
          : ['#5B43D9', '#9886F2', '#C9BEFF', '#B6B5BB']
      }
    });
  }

}
