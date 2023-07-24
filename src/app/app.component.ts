import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { map, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'http_1';

  isLoading!: boolean;

  of$ = of(1, 2, 3, 4, 5)
  constructor(
    private _lodaerService: LoaderService
  ) { }

  ngOnInit(): void {
    // this._lodaerService.lodingStatus
    //   .subscribe(
    //     res => this.isLoading = res
    //   )

    // this.of$
    //   .pipe(
    //     tap(num => console.log(`before maping ${num}`)),
    //     map((num) => num * 2),
    //     tap(num => console.log(`after maping ${num}`)),

    //   )
    //   .subscribe(res => {
    //     // console.log(res)
    //   })

  }
}
