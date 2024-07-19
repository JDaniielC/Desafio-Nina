import { Component, OnInit } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-charts-gallery',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './charts-gallery.component.html',
  styleUrl: './charts-gallery.component.scss'
})
export class ChartsGalleryComponent implements OnInit {
  options = [true, false, false]

  ngOnInit() {}

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
    return this.options[0]
  }

  get showMomentChart() {
    return this.options[1]
  }

  get showMonthGroupChart() {
    return this.options[2]
  }
}
