import { Component, OnInit, Input } from '@angular/core';
import { Complaint } from '../../types/complaints';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() complaintObservable!: Observable<Complaint[]>;
  complaints: Complaint[] = [];

  constructor() {}

  ngOnInit(): void {
    this.complaintObservable.subscribe(res => {
      this.complaints = res;
    });
  }
}
