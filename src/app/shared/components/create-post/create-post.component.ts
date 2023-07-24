import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../model/post';
import { SnackbarService } from '../../services/snackbar.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postId!: number

  postForm!: FormGroup

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _postService: PostService,
    private _router: Router,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    // console.log(this._route.snapshot.params['id']);
    // this.postId = +this._route.snapshot.params['id']

    this.createPostForm()

    // this._route.params
    //   .subscribe((res: Params) => {
    //     this.postId = +res['id']

    //     if (this.postId) {
    //       this._postService.getPost(this.postId)
    //         .subscribe(
    //           (res) => {
    //             console.log(res);
    //             this.postForm.patchValue(res)
    //           },
    //           (err) => console.log(err)

    //         )
    //     }
    //   })

    this._route.params
      .pipe(
        concatMap((params: Params) => {
          this.postId = +params['id']
          return this._postService.getPost(this.postId)
        })
      )
      .subscribe(
        (res) => {
          this.postForm.patchValue(res)
        }
      )
  }

  createPostForm() {
    this.postForm = this._fb.group({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    })
  }

  onPostFormSubmit() {
    if (this.postForm.valid) {
      // console.log(this.postForm.value);

      // let postObj = {
      //   userId: Math.ceil(Math.random() * 10),
      //   title: this.postForm.value.title,
      //   body: this.postForm.value.content
      // }


      let postObj = {
        userId: Math.ceil(Math.random() * 10),
        ...this.postForm.value
      }
      // console.log(postObj);

      this._postService.createPost(postObj)
        .subscribe(
          (res) => {
            // console.log(res);
            this._snackbarService.snackbarOpen(`the ${res.title} post added successfully`)
            this._router.navigate(['/posts'])
          },
          (err) => console.log(err)

        )
      // this._postService.createPost(this.postForm.value)
    }
  }

  onUpdate() {
    let postObj = {
      ...this.postForm.value,
      id: this.postId
    }
    console.log(postObj)
    this._postService.updatePost(postObj)
      .subscribe(
        res => {
          console.log(res);
          this._snackbarService.snackbarOpen(`the ${res.title} information updated successfully`)
          this._router.navigate(['/posts'])
        },

        err => {
          console.log(err);

        }
      )
  }
}
