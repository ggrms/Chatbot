import { element } from 'protractor';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { BootService } from '../core/services/boot.service';
import { Message } from '@app/core/interfaces/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public inputType = 'text';

  resultados: Message[];
  constructor(private chatBoot: BootService) {
    this.initBoot();
  }

  initBoot() {
    this.resultados = [];
    this.chatBoot.getResponse('oi').subscribe((lista: any) => {
      lista.result.fulfillment.messages.forEach((element: any) => {
        this.resultados.push({ remetente: 'boot', mensagem: element.speech, data: lista.timestamp });
      });
    });
    this.chatBoot.getResponse('ajuda').subscribe((lista: any) => {
      lista.result.fulfillment.messages.forEach((element: any) => {
        this.resultados.push({ remetente: 'boot', mensagem: element.speech, data: lista.timestamp });
      });
    });
  }

  sendMessage(msg: string) {
    this.resultados.push({ remetente: 'eu', mensagem: msg, data: new Date() });
    this.chatBoot.getResponse(msg).subscribe((lista: any) => {
      lista.result.fulfillment.messages.forEach((element: any) => {
        this.resultados.push({ remetente: 'boot', mensagem: element.speech, data: lista.timestamp });
      });
    });
    this.inputType = 'radio';
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private removerAcentos(s: any) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
