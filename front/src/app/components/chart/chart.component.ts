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
      this.options.dataLabels = {
        enabled: false
      };
    });
  }

}
