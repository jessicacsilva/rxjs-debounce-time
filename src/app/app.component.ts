import { Component } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import {
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  mergeAll,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  onKeyUp(event) {
    let observable = fromEvent(event.target, 'keyup')
      .pipe(
        map((event) => event.target.value),
        distinctUntilChanged(),
        debounceTime(1000),
        mergeMap((search) => of(search).pipe(delay(500)))
      )
      .subscribe((val) => {
        if (val == 'jessica') {
          console.log('user found!');
        } else {
          console.log('try again!');
        }
      });
  }
}
