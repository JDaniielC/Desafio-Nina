import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocaleConfig, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { Dayjs } from 'dayjs';
import { GetComplaintsRequest } from '../../types/complaints';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    FormsModule,
    NgxDaterangepickerMd
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  @Output() applyDateRange = new EventEmitter<GetComplaintsRequest | undefined>();

  selected: { startDate: Dayjs | null, endDate: Dayjs | null } | undefined;
  locale: LocaleConfig = {
    customRangeLabel: ' - ',
    daysOfWeek: this.getLocaleDayNames,
    monthNames: this.getLocaleMonthNames,
    firstDay: 0,
    format: 'DD/MM/YYYY',
  }

  get getLocaleDayNames(): string[] {
    return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  };

  get getLocaleMonthNames(): string[] {
    return ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  };

  applyDate() {
    if (this.selected && this.selected.startDate && this.selected.endDate) {
      return this.applyDateRange.emit({
        startDate: this.selected.startDate.format('YYYY-MM-DD'),
        endDate: this.selected.endDate.format('YYYY-MM-DD'),
      });
    }
    this.applyDateRange.emit();
  }

  clearDate() {
    this.applyDateRange.emit();
  }

  constructor() {}
}
