import { Component, OnInit } from '@angular/core';
import { Quote } from '../models/quote.model';
import { Phrase } from '../models/phrase.model';
import { QuotesService } from '../services/quotes.service';

@Component({
  selector: 'app-quote-creation',
  templateUrl: './quote-creation.component.html',
  styleUrls: ['./quote-creation.component.scss']
})
export class QuoteCreationComponent implements OnInit {

  phraseCounter: string[] = [];
  quoteTitle: string = '';
  quoteContext: string = '';

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
  }

  addPhrase() {
    this.phraseCounter.push('');  
    return false;
  }

  removePhrase() {
    this.phraseCounter.pop();
    return false;
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

  createQuote() {
    let quote: Array<any> = [];

    quote[0] = {
      title: this.sanitizeInput(this.quoteTitle),
      context: this.sanitizeInput(this.quoteContext),
      speakers: ""
    };

    if(!quote[0].title) {
      alert(`Invalid input to quote title: '${this.quoteTitle}'`);
      return;
    } else if(!quote[0].context) {
      alert(`Invalid input to quote context: '${this.quoteContext}'`);
      return;
    }

    const phrasesChildren = document.getElementById("phrases")!.children;
    let sequenceCounter = 1;

    for(let i = 0; i < phrasesChildren.length; i+=3) {
      quote[sequenceCounter] = {
        sequence: sequenceCounter,
        speaker: this.sanitizeInput((<HTMLInputElement>phrasesChildren[i]).value),
        text: this.sanitizeInput((<HTMLInputElement>phrasesChildren[i + 1]).value),
        quoteid: undefined
      }

      if(!quote[sequenceCounter].speaker) {
        alert(`Invalid input to phrase speaker: '${(<HTMLInputElement>phrasesChildren[i]).value}'`);
        return;
      } else if(!quote[sequenceCounter].text) {
        alert(`Invalid input to phrase text: '${(<HTMLInputElement>phrasesChildren[i + 1]).value}'`);
        return;
      }
    
      sequenceCounter++;

      //Ensure duplicate speakers aren't appended to speakers attribute
      if(quote[0].speakers.split(',').includes(this.sanitizeInput((<HTMLInputElement>phrasesChildren[i]).value))) {
        continue;
      }
      quote[0].speakers += (<HTMLInputElement>phrasesChildren[i]).value + ",";
    }

    this.quotesService.postQuote(quote);
    this.refresh();
  }

  refresh() {
    window.location.reload();
  }

}
