import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';
import { Phrase } from '../models/phrase.model';

@Injectable({
  providedIn: 'root'
})
export class PhrasesService {

  constructor(private http: HttpClient) { }

  getPhrases(): Observable<any> {
    return this.http.get('http://localhost:3000/quotes/phrases');
  }

  updatePhrase(phraseid: any, payload: any) {
    return this.http.patch(`http://localhost:3000/quotes/phrases/update/${phraseid}`, payload);
  }

}
