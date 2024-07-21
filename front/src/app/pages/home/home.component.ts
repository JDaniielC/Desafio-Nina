import { Component, OnInit } from '@angular/core';
import { Facade } from '../../app.facade';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartOptions } from '../../types/apexchart';
import {
  Complaint,
  ComplaintsAgeGroup,
  ComplaintsAtMoment,
  ComplaintsGenderGroup,
  ComplaintsMonthGroup,
  ComplaintsNeighborhood,
  ComplaintsTypeGroup,
  GetComplaintsRequest
} from '../../types/complaints';
import { ChartComponent } from '../../components/chart/chart.component';
import { ChartsGalleryComponent } from '../../components/charts-gallery/charts-gallery.component';
import { TableComponent } from '../../components/table/table.component';
import { Router } from '@angular/router';
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ChartComponent, ChartsGalleryComponent, TableComponent, DatepickerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  genderGroupChartData: BehaviorSubject<
    ChartOptions
  > = new BehaviorSubject({} as ChartOptions);

  ageGroupChartData: BehaviorSubject<
    ChartOptions
  > = new BehaviorSubject({} as ChartOptions);

  typeGroupChartData: BehaviorSubject<
    ChartOptions
  > = new BehaviorSubject({} as ChartOptions);

  neighborhoodGroupObservable: Observable<ComplaintsNeighborhood[]>;
  monthGroupObservable: Observable<ComplaintsMonthGroup>;
  momentGroupObservable: Observable<ComplaintsAtMoment>;
  complaintsListObservable: Observable<Complaint[]>;

  constructor(private readonly facade: Facade, private readonly router: Router) {
    this.neighborhoodGroupObservable = facade.getComplaintsNeighborhood()
    this.monthGroupObservable = facade.getComplaintsMonthGroup()
    this.momentGroupObservable = facade.getComplaintsAtMoment()
    this.complaintsListObservable = facade.getComplaintsList()
  }

  ngOnInit() {
    this.facade.getComplaintsGenderGroup().subscribe(res => {
      this.genderGroupChartData.next(this.createGenderGroupChart(res))
    });

    this.facade.getComplaintsAgeGroup().subscribe(res => {
      this.ageGroupChartData.next(this.createAgeGroupChart(res))
    })

    this.facade.getComplaintsTypeGroup().subscribe(res => {
      this.typeGroupChartData.next(this.createTypeGroupChart
      (res))
    })
  }

  fetchComplaints(dates?: GetComplaintsRequest) {
    this.facade.fetchComplaints(dates)
  }

  selectComplaint(complaintId: string) {
    this.router.navigate(['/detail', complaintId])
  }

  createTypeGroupChart(data: ComplaintsTypeGroup): ChartOptions {
    const total = data.unwantedPhotos + data.groping + data.threatening + data.flashing + data.stalking + data.unwantedComments

    const values = [
      data.unwantedPhotos,
      data.groping,
      data.threatening,
      data.flashing,
      data.stalking,
      data.unwantedComments
    ]

    const theMostCommon = Math.max(...values)

    const theSecondMostCommon = Math.max(
      ...values.filter(el => el < theMostCommon)
    )

    const theThirdMostCommon = Math.max(
      ...values.filter(el => el < theSecondMostCommon)
    )

    let categories = [
      { name: ['Fotografia ', 'não autorizada'], value: data.unwantedPhotos },
      { name: ['Encoxada/', 'apalpada'], value: data.groping },
      { name: 'Intimidação', value: data.threatening },
      { name: 'Pessoa se exibindo', value: data.flashing },
      { name: 'Perseguição', value: data.stalking },
      { name: 'Outros', value: data.unwantedComments }
    ]

    categories = categories.sort((a, b) => b.value - a.value)

    return {
      chart: {
        type: 'bar',
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '85%',
        }
      },
      series: [
        {
          name: 'Tipos',
          data: categories.map(el => el.value)
        }
      ],
      title: {
        text: 'Tipo de agressão',
        style: {
          color: '#000'
        }
      },
      xaxis: {
        categories: categories.map(el => el.name),
        position: 'top',
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Poppins',
            fontWeight: 500,
            colors: '#000'
          },
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Poppins',
            fontWeight: 500,
          },
          offsetX: -10,
        }
      },
      colors: [
        function({ value }: {
          value: number;
        }) {
          const colors = ['#5B43D9', '#9886F2', '#C9BEFF', '#B6B5BB']

          if (value >= theMostCommon) {
            return colors[0]
          } else if (value >= theSecondMostCommon) {
            return colors[1]
          } else if (value >= theThirdMostCommon) {
            return colors[2]
          }
          return colors[3]
        }
      ],
    }
  }

  createAgeGroupChart(data: ComplaintsAgeGroup): ChartOptions {
    return {
      chart: {
        type: 'bar'
      },
      series: [
        {
          name: 'Idades',
          data: [
            data.under_14,
            data.from_14_to_18,
            data.from_19_to_29,
            data.from_30_to_39,
            data.from_40_to_49,
            data.from_50_to_59,
            data.above_60
          ]
        }
      ],
      title: {
        text: 'Faixa etária',
        style: {
          color: '#000'
        }
      },
      xaxis: {
        categories: [
          '< 14', '14 - 18', '19 - 29', '30 - 39', '40 - 49', '50 - 59', '> 60'
        ],
      },
      colors: [
        '#5B43D9'
      ],
    }
  }

  createGenderGroupChart(data: ComplaintsGenderGroup): ChartOptions {
    return {
      chart: {
        type: 'bar',
      },
      series: [
        {
          name: 'Cisgênero',
          group: 'Mulheres',
          data: [data.cisFemale, data.cisMale]
        },
        {
          name: 'Transgênero',
          group: 'Mulheres',
          data: [data.transFemale, data.transMale]
        },
        {
          name: '',
          group: 'Não-binários',
          data: [0, 0, data.other]
        }
      ],
      title: {
        text: 'Gênero',
        style: {
          color: '#000'
        }
      },
      xaxis: {
        categories: ['Mulheres', 'Homens', 'Não-binários'],
      },
      colors: [
        '#5B43D9', '#9886F2', '#9886F2'
      ],
      legend: {
        fontFamily: 'Poppins',
        fontSize: '14px',
        labels: {
          colors: '#000',
        },
        customLegendItems: ['Cisgênero', 'Transgênero'],
      }
    }
  }
}
