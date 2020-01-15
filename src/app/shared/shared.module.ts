import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnippetService } from './snippet/snippet.service';
import { SnippetResolveService } from './snippet/snippet-resolve.service';
import { SnippetCollectionResolveService } from './snippet/snippet-collection-resolve.service';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { RouterModule } from '@angular/router';
import { MaddobLibModule } from 'maddob-lib';
import { ArticlePaginationComponent } from './article-pagination/article-pagination.component';

@NgModule({
  declarations: [HtmlEditorComponent, ArticlePaginationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaddobLibModule
  ],
  providers: [
    SnippetService,
    SnippetResolveService,
    SnippetCollectionResolveService
  ],
  exports: [HtmlEditorComponent, ArticlePaginationComponent]
})
export class SharedModule { }
