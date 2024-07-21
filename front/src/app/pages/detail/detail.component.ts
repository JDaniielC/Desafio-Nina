import { Component, OnInit } from '@angular/core';
import { Facade } from '../../app.facade';
import { Complaint } from '../../types/complaints';
import { CommonModule } from '@angular/common';
import { AgePipe } from '../../pipes/age.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AgePipe,
    TranslatePipe
  ],
})
export class DetailComponent implements OnInit {
  complaint: Complaint = {} as Complaint;
  constructor(
    private readonly facade: Facade,
    private readonly router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if (params['id']) this.facade.fetchComplaint(params['id']);
    })
    this.facade.getComplaint().subscribe(res => {
      this.complaint = res || {} as Complaint;
    })
  }
}
