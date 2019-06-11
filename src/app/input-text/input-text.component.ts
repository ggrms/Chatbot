import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'input-text',
  templateUrl: 'input-text.component.html',
  styleUrls: ['input-text.component.scss']
})
export class InputTextComponent {
  message: string;
  @Output() send = new EventEmitter();

  sendInput() {
    this.send.emit(this.message);
    this.message = '';
  }
}
