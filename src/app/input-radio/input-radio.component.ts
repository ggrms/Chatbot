import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'input-radio',
  templateUrl: 'input-radio.component.html',
  styleUrls: ['input-radio.component.scss']
})
export class InputRadioComponent {
  message: string;
  @Output() send = new EventEmitter();

  sendRadio(event: Event) {
    console.log((<HTMLInputElement>event.target).value);
    //this.send.emit(this.message);
    this.message = '';
  }
}
