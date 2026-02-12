import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layouts/private/footer/footer.component';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [/*RouterOutlet, FooterComponent*/],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'project';
  letter1: string = '';
  letter2: string = '';
  letter3: string = '';
  subscription1?: Subscription;
  subscription2?: Subscription;
  subscription3?: Subscription;
  helloObservable$?: Observable<string>;
  // subscriber = function(subsriber:Subscriber<string>){

  // }
  constructor() {
    this.helloObservable$ = new Observable<string>((subscriber: Subscriber<string>) => {
      const message = 'Hello, Angular!';
      for (let i = 0; i < message.length; i++) {
        setTimeout(() => {
          subscriber.next(message[i]);
        }, 1000 * (i + 1));
      }
      setInterval(() => { subscriber.complete() }, 1000 * (message.length + 1));
    });

  }

  ngOnInit(): void {
    const helloObserver1 = {
      next: (letter: string) => {
        this.letter1 = letter;
      },
      complete: () => {
        console.log("Observer 1 a reçu toutes les données")
      }
    }
    const helloObserver2 = {
      next: (letter: string) => {
        this.letter2 = letter;
      },
      complete: () => {
        console.log("Observer 2 a reçu toutes les données")
      }
    }

    this.subscription1 = this.helloObservable$!.subscribe(helloObserver1);
    this.subscription2 = this.helloObservable$!.subscribe(helloObserver2);
    this.subscription3 = this.helloObservable$!.subscribe({
      next: (letter: string) => {
        this.letter3 = letter;
      },
      complete: () => {
        console.log("Observer 3 a reçu toutes les données")
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
    console.log("AppComp détruit et desabonnement")
  }
}
