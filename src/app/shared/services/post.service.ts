import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/post';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postUrl: string = environment.baseUrl + '/posts'
  constructor(
    private _http: HttpClient,
    private _snackbarService: SnackbarService
  ) { }

  getAllPost(): Observable<Array<Ipost>> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer Your_token'
    // })
    // return this._http.get<Array<Ipost>>(this.postUrl, {
    //   headers: headers
    // })

    return this._http.get<Array<Ipost>>(this.postUrl)
      .pipe(
        catchError(err => {
          // alert(`something went wrong ....!!!`)
          this._snackbarService.snackbarOpen(`something went wrong`)
          return of(err)
        })
      )
  }

  getPost(id: number): Observable<Ipost> {
    return this._http.get<Ipost>(`${this.postUrl}/${id}`)
  }

  deletePost(id: number) {
    return this._http.delete<any>(`${this.postUrl}/${id}`)
  }

  createPost(obj: Ipost): Observable<Ipost> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer Your_token'
    // })
    // return this._http.post<Ipost>(this.postUrl, obj, { headers })
    return this._http.post<Ipost>(this.postUrl, obj)
  }

  updatePost(obj: Ipost): Observable<Ipost> {
    return this._http.patch<Ipost>(`${this.postUrl}/${obj.id}`, obj)
  }
}
