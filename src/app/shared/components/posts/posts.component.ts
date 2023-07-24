import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../model/post';
import { Observable, Subject, interval, takeUntil } from 'rxjs';
import { IntercepterService } from '../../services/intercepter.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  postArray: Array<Ipost> = [];
  // postArray$!: Observable<Array<Ipost>>

  unSubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private _postService: PostService,
    private _intercepter: IntercepterService
  ) { }

  ngOnInit(): void {

    // this._postService.getAllPost()
    //   .subscribe((res: Array<Ipost>) => {
    //     // console.log(res);
    //     this.postArray = res

    //   },
    //     (err) => {
    //       console.log('something wrong while fetching data');

    //     }
    //   )

    // this.postArray$ = this._postService.getAllPost()

    this._postService.getAllPost()
      .subscribe((res) => {
        if (Array.isArray(res)) {
          this.postArray = res
        }

      })




    // const ourIntervel$: Observable<number> = interval(1000)

    // ourIntervel$
    //   .pipe(
    //     takeUntil(this.unSubscribe$)
    //   )
    //   .subscribe(
    //     res => console.log(`getting value 1st time ${res}`)
    //   )


  }


  ngOnDestroy(): void {
    // this.unSubscribe$.next()
    // this.unSubscribe$.complete()

    this._intercepter.unSubscribeAll()
  }
}
