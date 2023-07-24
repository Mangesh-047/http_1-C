import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, delay, finalize, takeUntil } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {

  private unSubscribeAll$: Subject<void> = new Subject<void>()

  constructor(
    private _loderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = `Berer Here Take a Auth token From Local Storage`
    this._loderService.lodingStatus
      .next(true)


    const authRequest = req.clone({
      setHeaders: {
        Authorization: authToken,
        // authToken: 
      }
    })

    return next.handle(authRequest)
      .pipe(
        takeUntil(this.unSubscribeAll$),
        delay(500),
        finalize(() => this._loderService.lodingStatus.next(false))
      )
  }


  unSubscribeAll(): void {
    this.unSubscribeAll$.next()
    this.unSubscribeAll$.complete()
  }
}
