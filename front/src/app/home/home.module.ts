import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeInitializerProvider } from './home.initializer';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeFacade } from './home.facade';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';

@NgModule({
  declarations: [HomeComponent, DetailComponent],
  providers: [
    HomeFacade,
    homeInitializerProvider
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
