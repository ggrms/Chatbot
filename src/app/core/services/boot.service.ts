import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BootService {
  private baseURL: string = 'https://api.dialogflow.com/v1/query?v=20150910';
  private token: string = '0ab35cc77d2a44d08d10924c69dd0eaa';

  constructor(private http: HttpClient) {}

  public getResponse(query: string) {
    let data = {
      query: query,
      lang: 'pt-br',
      sessionId: '12345'
    };

    return this.http.post(`${this.baseURL}`, data, { headers: this.getHeaders() });
  }

  public getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
