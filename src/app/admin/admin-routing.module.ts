import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { FileManagerComponent } from './file/file-manager.component';
import { BlogFileCollectionResolveService } from '../services/file/blog-file-collection-resolve.service';
import { UserResolveService } from '../services/user/user-resolve.service';
import { AccessGuard } from './access.guard';
import { SnippetResolveService } from '../shared/snippet/snippet-resolve.service';
import { SettingsComponent } from './settings/settings.component';
import { SettingsResolveService } from '../services/settings/settings-resolve.service';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canLoad: [AccessGuard], resolve: { userData: UserResolveService },
    children: [
        {
          path: '', canLoad: [AccessGuard], component: GlobalStatsComponent
        },

        {
          path: 'users', canLoad: [AccessGuard], component: UsersComponent
        },
        {
          path: 'articles', canLoad: [AccessGuard], loadChildren: () => import('./../article-management/article-management.module').then(m => m.ArticleManagementModule),
        },
        {
          path: 'pages', canLoad: [AccessGuard], loadChildren: () => import('./../page-management/page-management.module').then(m => m.PageManagementModule),
        },
        {
          path: 'file-manager', canLoad: [AccessGuard], component: FileManagerComponent, resolve: { filePage: BlogFileCollectionResolveService}
        },
        {
          path: 'snippets', loadChildren: () => import('./../snippet-management/snippet-management.module').then(m => m.SnippetManagementModule)
        },
        {
          path: 'settings', canLoad: [AccessGuard], component: SettingsComponent, resolve: {websiteProperties: SettingsResolveService}
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
