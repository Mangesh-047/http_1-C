import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../model/post';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { DialogComponent } from '../../material/dialog/dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


  postId!: number
  postObj!: Ipost
  constructor(
    private _route: ActivatedRoute,
    private _postService: PostService,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this._route.snapshot.params['id']);

    this.postId = +this._route.snapshot.params['id']

    this._postService.getPost(this.postId)
      .subscribe((res: Ipost) => {
        this.postObj = res
      })


    // this._route.params
    //   .subscribe()

  }

  onDeletePost(id: number) {
    this._postService.deletePost(id)
      .subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/posts'])
        },

        (err) => {
          console.log('something went wrong');
        }
      )
  }

  openDialog() {
    let dialogConfig = new DialogConfig

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true

    this.dialog.open(DialogComponent)
  }

}
