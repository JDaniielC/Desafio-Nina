import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from '../../types/apexchart';
import {
  ComplaintsNeighborhood,
  ComplaintsAtMoment,
  ComplaintsMonthGroup
} from '../../types/complaints';
import { ChartComponent } from '../chart/chart.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-charts-gallery',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './charts-gallery.component.html',
  styleUrl: './charts-gallery.component.scss'
})
export class ChartsGalleryComponent implements OnInit {
  @Input() neighborhoodDataObservable!: Observable<ComplaintsNeighborhood[]>;
  @Input() momentDataObservable!: Observable<ComplaintsAtMoment>;
  @Input() monthGroupDataObservable!: Observable<ComplaintsMonthGroup>;

  monthGroupChartData: BehaviorSubject<
    ChartOptions
  > = new BehaviorSubject({} as ChartOptions);

  momentChartData: BehaviorSubject<
    ChartOptions
  > = new BehaviorSubject({} as ChartOptions);

  afterChartData: BehaviorSubject<
    ChartOptions
  > = new BehaviorSubject({} as ChartOptions);

  neighborhoodChartData: BehaviorSubject<
    ChartOptions
  > = new BehaviorSubject({} as ChartOptions);

  options = [true, false, false]

  ngOnInit() {
    this.neighborhoodDataObservable.subscribe(data => {
      this.neighborhoodChartData.next(this.createNeighborhoodChart(data))
    })

    this.momentDataObservable.subscribe(data => {
      const total = data.true + data.false
      const onMomentSeries = [
        data.true * 100 / total, data.false * 100 / total
      ]
      const afterSeries = [
        data.false * 100 / total, data.true * 100 / total
      ]

      this.momentChartData.next(
        this.createMomentChart('No momento', onMomentSeries)
      )
      this.afterChartData.next(
        this.createMomentChart('Após o ocorrido', afterSeries)
      )
    })

    this.monthGroupDataObservable.subscribe(data => {
      this.monthGroupChartData.next(this.createMonthGroupChart(data))
    })
  }

  createNeighborhoodChart(data: ComplaintsNeighborhood[]): ChartOptions {
    const neighborhoods = data.sort((a, b) => b.count - a.count)
    return {
      chart: {
        type: 'bar',
      },
      series: [
        {
          name: 'Bairros',
          data: neighborhoods.map(el => el.count)
        }
      ],
      grid: {
        show: false
      },
      title: {
        text: 'Ranking de bairros',
        style: {
          color: '#ffffff',
        }
      },
      xaxis: {
        categories: neighborhoods.map(el => el.name),
        axisBorder: {
          color: '#ffffff',
        },
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Poppins',
            fontWeight: 500,
            colors: '#ffffff'
          }
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: ['#ffffff'],
      yaxis: {
        title: {
          text: 'Casos',
          style: {
            fontSize: '12px',
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: '#ffffff'
          },
          rotate: 1,
          offsetY: -55
        },
        axisBorder: {
          show: true,
          color: '#ffffff',
        },
        labels: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
      }
    }
  }


  createMomentChart(label: string, series: number[]): ChartOptions {
    return {
      series: series,
      chart: {
        type: "donut",
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: label,
                color: '#ffffff',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 600,
                formatter: (w) => {
                  return w.globals.seriesTotals[0].toFixed(2) + "%"
                }
              }
            },
          }
        }
      },
      labels: ["No momento", "Após o ocorrido"],
      tooltip: {
        enabled: false
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#ffffff', '#9886F2']
    }
  }

  createMonthGroupChart(data: ComplaintsMonthGroup): ChartOptions {
    const categories = Object.keys(data)
    const dataValues = Object.values(data)

    return {
      chart: {
        type: 'area'
      },
      stroke: {
        curve: 'straight',
        colors: ['#ffffff']
      },
      series: [
        {
          name: 'Meses',
          data: dataValues
        }
      ],
      title: {
        text: 'Casos por mês',
        style: {
          color: '#ffffff',
        }
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Poppins',
            fontWeight: 500,
            colors: '#ffffff'
          }
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Poppins',
            fontWeight: 500,
            colors: '#ffffff'
          }
        }
      },
    }
  }

  toggleChart(index: number) {
    this.options = this.options.map(() => false)
    this.options[index] = !this.options[index]
  }

  prevChart() {
    const currentIndex = this.options.findIndex(el => el)
    const prevIndex = currentIndex - 1 < 0 ? this.options.length - 1 : currentIndex - 1
    this.toggleChart(prevIndex)
  }

  nextChart() {
    const currentIndex = this.options.findIndex(el => el)
    const nextIndex = currentIndex + 1 >= this.options.length ? 0 : currentIndex + 1
    this.toggleChart(nextIndex)
  }

  get showNeighborhoodChart() {
    return this.options[2]
  }

  get showMomentChart() {
    return this.options[0]
  }

  get showMonthGroupChart() {
    return this.options[1]
  }
}
