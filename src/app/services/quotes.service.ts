import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';
import { Phrase } from '../models/phrase.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<any> {
    return this.http.get('http://localhost:3000/quotes');
  }

  postQuote(quote: Array<Quote | Phrase>) {
    return this.http.post('http://localhost:3000/quotes', quote).subscribe((data) => {
    });
  }

  deleteQuote(quoteid: any) {
    return this.http.delete(`http://localhost:3000/quotes/delete/${quoteid}`);
  }

  updateQuote(quoteid: any, payload: any) {
    return this.http.patch(`http://localhost:3000/quotes/update/${quoteid}`, payload);
  }

}
