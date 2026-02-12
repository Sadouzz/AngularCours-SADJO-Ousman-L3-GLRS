import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layouts/private/footer/footer.component';
import { concatMap, delay, Observable, of, Subscriber, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, /*RouterOutlet, FooterComponent*/],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'project';
  helloObservable$?: Observable<string>;
  // subscriber = function(subsriber:Subscriber<string>){

  // }
  constructor() {

  }

  ngOnInit(): void {
    this.helloObservable$ = of('H', 'e', 'l', 'l', 'o', ',', ' ', 'A', 'n', 'g', 'u', 'l', 'a', 'r', '!').pipe(
      concatMap(letter => of(letter).pipe(delay(1000)))
    );
  }

  // ngOnInit(): void {
  //   this.helloObservable$ = from('Hello, Angular!').pipe(
  //     concatMap(letter =>
  //       of(letter).pipe(delay(300))
  //     )
  //   );
  // }
}
