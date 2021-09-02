import { Component, OnInit } from '@angular/core';
import { Quote } from '../models/quote.model';
import { Phrase } from '../models/phrase.model';
import { QuotesService } from '../services/quotes.service';
import { PhrasesService } from '../services/phrases.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quotes!: Quote[];
  phrases!: Phrase[];

  constructor(private quotesService: QuotesService, private phrasesService: PhrasesService) { }

  ngOnInit(): void {
    this.quotesService.getQuotes().subscribe(data =>{
      this.quotes = data;
    });
    this.phrasesService.getPhrases().subscribe(data =>{
      this.phrases = this.phraseInsertionSort(data);
    });
  }

  phraseInsertionSort(arr: Phrase[]): Phrase[] {
    let n = arr.length;

    for(let i = 1; i < n; i++) {
      let current = arr[i];  //Current element to sort
      let j = i - 1;         //Index of last element of sorted subarray

      //Shift elements that are greater than current to the right
      while((j > -1) && (current.sequence < arr[j].sequence)) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = current;  //Place current element in ordered position
    }

    return arr;
  }

  deleteQuote(quoteid: any) {
    let confirmation = window.confirm(`Are you sure you want to delete this quote? (ID: ${quoteid})`);
    if(confirmation) {
      this.quotesService.deleteQuote(quoteid).subscribe(data =>{
        if(data) {
          this.refresh();
        }
      });
    }
  }

  onEnterKeydown(event: any) {
    event.preventDefault();
  }

  sanitizeInput(input: string) {
    let regex = /^[A-Za-z0-9\s!?@#$%&*()_\-=+;:',.\/]*$/;
    if(!(regex.test(input))) {
      return '';
    }

    let sanitized = input;
    for(let i = 0; i < sanitized.length; i++) {
      if(sanitized[i] === "'") {
        sanitized = sanitized.substring(0, i) + "'" + sanitized.substring(i, sanitized.length);
        i++;
      }
    }
    return sanitized;
  }

  updateQuote(event: any, quoteid: any) {
    let column = event.target.classList[0] == 'quote-title' ? 'title' : 'context';
    let value = this.sanitizeInput(event.target.value);
    if(!value) {
      alert(`Invalid input to quote ${column}: '${event.target.value}'`);
      return;
    }
    let payload = { [column]: value };
    this.quotesService.updateQuote(quoteid, payload).subscribe(data =>{
      if(data){
        this.refresh();
      }
    });
  }

  updatePhrase(event: any, phraseid: any) {
    let column = event.target.classList[0] == 'text' ? 'text' : 'speaker';
    let value = this.sanitizeInput(event.target.value);
    if(!value) {
      alert(`Invalid input to phrase ${column}: '${event.target.value}'`);
      return;
    }
    let payload = { [column]: value };
    this.phrasesService.updatePhrase(phraseid, payload).subscribe(data =>{
      if(data){
        this.refresh();
      }
    });
  }

  refresh() {
    window.location.reload();
  }

}
