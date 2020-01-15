import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleCollectionResolveService } from '../services/article/article-collection-resolve.service';
import { ArticleViewComponent } from './article/view/article-view.component';
import { ArticleResolveService } from '../services/article/article-resolve.service';

import { Error404Component } from './error404/error404.component';
import { MainComponent } from './main/main.component';
import { MenuResolveService } from '../services/page/menu-resolve.service';
import { PageViewComponent } from './page-view/page-view.component';
import { PageResolveService } from '../services/page/page-resolve.service';
import { ServerErrorComponent } from './server-error/server-error.component';
import { LogoutComponent } from './logout/logout.component';
import { ArticlePageResolveService } from '../services/article/article-page-resolve.service';
import { RxjsDemoComponent } from './rxjs-demo/rxjs-demo.component';

const routes: Routes = [
  { path: '', component: MainComponent, resolve: { menu: MenuResolveService }, children: [
    { path: 'home', component: HomeComponent, resolve: { articlePage: ArticlePageResolveService }},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'article/:id', component: ArticleViewComponent, resolve: {article: ArticleResolveService }},
    { path: 'logout', component: LogoutComponent },
    { path: 'rxjs', component: RxjsDemoComponent },
    { path: 'error404', component: Error404Component },
    { path: 'error5xx', component: ServerErrorComponent },
    { path: ':slug', component: PageViewComponent, resolve: { page: PageResolveService }},
    { path: '**', component: Error404Component }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicSiteRoutingModule { }
