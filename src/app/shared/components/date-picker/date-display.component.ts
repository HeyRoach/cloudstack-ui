import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import {
  dateTimeFormat as DateTimeFormat
} from './dateUtils';

@Component({
  selector: 'cs-date-display',
  templateUrl: 'date-display.component.html',
  styleUrls: ['date-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateDisplayComponent {
  @Input() public locale: string;
  @Input() public selectedDate: Date;
  @Input() public showMonth = true;

  @Output() public monthClick = new EventEmitter();
  @Output() public yearClick = new EventEmitter();

  public get year(): string {
    return new DateTimeFormat(this.locale, {
      year: 'numeric',
    }).format(this.selectedDate);
  }

  public get dateTime(): string {
    return new DateTimeFormat(this.locale, {
      month: 'short',
      weekday: 'short',
      day: '2-digit',
    }).format(this.selectedDate);
  }
}