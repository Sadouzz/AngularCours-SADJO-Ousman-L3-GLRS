import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layouts/private/footer/footer.component';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, /*RouterOutlet, FooterComponent*/],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'project';
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

  }

  ngOnDestroy(): void {

  }
}
