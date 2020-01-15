import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSiteRoutingModule } from './public-site-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleViewComponent } from './article/view/article-view.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { Error404Component } from './error404/error404.component';
import { PageViewComponent } from './page-view/page-view.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { LogoutComponent } from './logout/logout.component';
import { ArticlePaginationComponent } from './article-pagination/article-pagination.component';
import { RxjsDemoComponent } from './rxjs-demo/rxjs-demo.component';

@NgModule({
  imports: [
    CommonModule,
    PublicSiteRoutingModule,
    FormsModule
  ],
  declarations: [
    Error404Component,
    MainComponent,
    HomeComponent,
    ArticleViewComponent,
    PageViewComponent,
    ServerErrorComponent,
    LogoutComponent,
    ArticlePaginationComponent,
    RxjsDemoComponent
  ]
})
export class PublicSiteModule { }
