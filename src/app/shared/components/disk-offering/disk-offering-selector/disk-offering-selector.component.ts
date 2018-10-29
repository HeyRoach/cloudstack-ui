import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DiskOffering } from '../../../models/index';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DiskOfferingDialogComponent } from '../disk-offering-dialog/disk-offering-dialog.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'cs-disk-offering-selector',
  templateUrl: 'disk-offering-selector.component.html',
  styleUrls: ['disk-offering-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DiskOfferingSelectorComponent),
      multi: true,
    },
  ],
})
export class DiskOfferingSelectorComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Input()
  public diskOfferings: DiskOffering[];
  @Input()
  public required: boolean;
  @Input()
  public account: Account;
  @Input()
  public enableSlider = false;
  @Input()
  public enableSelector = true;
  @Input()
  public min: number;
  @Input()
  public newSize: number;
  @Input()
  public availableStorage: string;
  @Output()
  public changed = new EventEmitter();
  @Output()
  public changedSize = new EventEmitter<number>();
  public max: number;
  // tslint:disable-next-line
  private _diskOffering: DiskOffering;

  @Input()
  public get diskOffering(): DiskOffering {
    return this._diskOffering;
  }

  public set diskOffering(value: DiskOffering) {
    if (value) {
      this._diskOffering = value;
      this.propagateChange(this.diskOffering);
    }
  }

  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.changed = new EventEmitter();
  }

  public ngOnInit() {
    this.setMaxSizeValue();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.storageAvailable && changes.storageAvailable.currentValue) {
      this.setMaxSizeValue();
    }
  }

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {}

  public propagateChange: any = () => {};

  public writeValue(diskOffering: DiskOffering): void {
    if (diskOffering) {
      this._diskOffering = diskOffering;
    }
  }

  public changeOffering(): void {
    this.dialog
      .open(DiskOfferingDialogComponent, {
        width: '750px',
        data: {
          diskOfferings: this.diskOfferings,
          diskOffering: this._diskOffering,
          storageAvailable: this.availableStorage,
        },
      })
      .afterClosed()
      .subscribe((offering: DiskOffering) => {
        if (offering) {
          this.diskOffering = offering;
          this.changed.next(offering);
        }
      });
  }

  private setMaxSizeValue() {
    const customDiskOfferingMaxSize = this.authService.getCustomDiskOfferingMaxSize();
    this.min = this.min ? this.min : this.authService.getCustomDiskOfferingMinSize();
    this.max =
      !this.availableStorage && isNaN(Number(this.availableStorage))
        ? customDiskOfferingMaxSize
        : Math.min(customDiskOfferingMaxSize, Number(this.availableStorage));
  }
}
