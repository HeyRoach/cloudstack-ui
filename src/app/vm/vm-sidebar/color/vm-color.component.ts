import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { Color } from '../../../shared/models';
import { VirtualMachine } from '../../shared/vm.model';
import { VmTagService } from '../../../shared/services/tags/vm-tag.service';
import { configSelectors, State } from '../../../root-store';


@Component({
  selector: 'cs-vm-color',
  templateUrl: 'vm-color.component.html',
  styleUrls: ['vm-color.component.scss']
})
export class VmColorComponent implements OnChanges, OnInit, OnDestroy {
  @Input() public vm: VirtualMachine;
  @Output() public onColorChange = new EventEmitter();

  public color: Color;
  public colorList: Array<Color> = [];

  // todo set inProgress while color is updating
  public colorUpdateInProgress: boolean;
  private colorSubject = new Subject<Color>();

  constructor(
    private vmTagService: VmTagService,
    private store: Store<State>,
  ) {
  }

  public ngOnInit(): void {
    this.store.select(configSelectors.get('vmColors')).pipe(
      first()
    ).subscribe(colors => {
      for (const color of colors) {
        this.colorList.push(new Color('', color.value));
      }
    });

    this.colorSubject
      .debounceTime(1000)
      .subscribe(color => {
        this.onColorChange.emit(color);
      });
  }

  public ngOnChanges(): void {
    this.color = this.vmTagService.getColorSync(this.vm);
  }

  public ngOnDestroy(): void {
    this.colorSubject.unsubscribe();
  }

  public changeColor(color: Color): void {
    this.colorSubject.next(color);
  }
}
