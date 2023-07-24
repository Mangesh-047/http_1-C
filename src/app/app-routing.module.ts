import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './shared/components/posts/posts.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { CreatePostComponent } from './shared/components/create-post/create-post.component';
import { PostComponent } from './shared/components/post/post.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'posts/:id',
    component: PostComponent
  },
  {
    path: 'posts/:id/edit',
    component: CreatePostComponent
  },
  {
    path: 'create-post',
    component: CreatePostComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
