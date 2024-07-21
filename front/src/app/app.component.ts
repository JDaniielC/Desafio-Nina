import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { Facade } from './app.facade';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    LoadingComponent,
  ]
})
export class AppComponent implements OnInit {
  isLoading = false;

  constructor(private readonly facade: Facade) {}

  ngOnInit(): void {
    this.facade.getLoading().pipe(delay(1)).subscribe(loading => {
      this.isLoading = loading;
    });
  }
}
