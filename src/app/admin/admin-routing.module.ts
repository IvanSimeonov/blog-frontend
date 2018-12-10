import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { FileManagerComponent } from './file/file-manager.component';
import { BlogFileCollectionResolveService } from '../services/file/blog-file-collection-resolve.service';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
        {
          path: '', component: GlobalStatsComponent
        },

        {
          path: 'users', component: UsersComponent
        },
        {
          path: 'articles', loadChildren: './../article-management/article-management.module#ArticleManagementModule',
        },
        {
          path: 'file-manager', component: FileManagerComponent, resolve: { blogFileCollection: BlogFileCollectionResolveService}
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
