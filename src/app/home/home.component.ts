import { element } from 'protractor';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { BootService } from '../core/services/boot.service';

export interface Message {
  remetente?: string;
  mensagem: string;
  data?: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  msg: string;
  resultados: Message[];
  constructor(private chatBoot: BootService) {
    this.initBoot();
  }

  initBoot() {
    this.resultados = [];
    this.chatBoot.getResponse('oi').subscribe((lista: any) => {
      lista.result.fulfillment.messages.forEach(element => {
        this.resultados.push({ remetente: 'boot', mensagem: element.speech, data: lista.timestamp });
      });
    });
    this.chatBoot.getResponse('ajuda').subscribe((lista: any) => {
      lista.result.fulfillment.messages.forEach(element => {
        this.resultados.push({ remetente: 'boot', mensagem: element.speech, data: lista.timestamp });
      });
    });
  }

  sendMessage() {
    this.resultados.push({ remetente: 'eu', mensagem: this.msg, data: new Date() });
    this.chatBoot.getResponse(this.removerAcentos(this.msg)).subscribe((lista: any) => {
      lista.result.fulfillment.messages.forEach(element => {
        this.resultados.push({ remetente: 'boot', mensagem: element.speech, data: lista.timestamp });
      });
    });
    this.msg = '';
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private removerAcentos(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
