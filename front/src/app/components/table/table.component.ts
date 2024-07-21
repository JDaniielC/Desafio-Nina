import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() selectComplaintEvent = new EventEmitter<string>();

  complaints: Complaint[] = [];
  pageItems: Complaint[][] = [];
  pageButtons: (number | null)[] = []

  ITEMS_PER_PAGE = 6;
  currentPage = 1;
  totalPages = 0;
  TOTAL_BUTTONS = 7

  constructor() {}

  ngOnInit(): void {
    this.complaintObservable.subscribe(res => {
      this.pageItems = this.createPageItems(res);
      this.complaints = this.pageItems[0];
      this.totalPages = this.pageItems.length;
    });
  }

  selectComplaint(complaintId: string) {
    this.selectComplaintEvent.emit(complaintId);
  }

  createPageItems(complaints: Complaint[]): Complaint[][] {
    const pageItems: Complaint[][] = [];
    for (let i = 0; i < complaints.length; i += this.ITEMS_PER_PAGE) {
      pageItems.push(complaints.slice(i, i + this.ITEMS_PER_PAGE));
    }
    return pageItems;
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.complaints = this.pageItems[page - 1];
  }

  fillNumberArray(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, i) => i + start);
  }

  get _pageButtons() {
    if(this.totalPages <= this.TOTAL_BUTTONS) {
      this.pageButtons = [...Array(this.totalPages).keys()];
    } else if (this.currentPage + (this.TOTAL_BUTTONS - 1) <= this.totalPages) {
      this.pageButtons = this.fillNumberArray(
        this.currentPage > 2 ? this.currentPage - 2 : 0, this.currentPage > 1 ? this.currentPage + 1 : this.currentPage + 2
      );
      if (this.currentPage > 2) {
        this.pageButtons.splice(0, 0, null);
        this.pageButtons.splice(0, 0, 0);
      }
      this.pageButtons.push(null);
      if (this.currentPage > 1) {
        this.pageButtons.push(this.totalPages - 1);
      } else {
        this.pageButtons = this.pageButtons.concat(
          this.fillNumberArray(this.totalPages - 3, this.totalPages)
        );
      }
    } else {
        this.pageButtons = this.fillNumberArray(
          this.totalPages - this.TOTAL_BUTTONS, this.totalPages
        );
        this.pageButtons.splice(0, 0, null);
        this.pageButtons.splice(0, 0, 0);
    }

    return this.pageButtons;
  }
}
