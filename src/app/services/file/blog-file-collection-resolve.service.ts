import { Injectable } from '@angular/core';
import { BlogFileCollection } from '../../api/blog-file';
import { Resolve } from '@angular/router';
import { AbstractFileService } from './abstract.file.service';
import { Observable } from 'rxjs';
import { FilePage } from './../../api/file-page';

@Injectable({
  providedIn: 'root'
})
export class BlogFileCollectionResolveService implements Resolve<FilePage> {

  constructor(private fileService: AbstractFileService) {}

  resolve(): Observable<FilePage> {
    return this.fileService.getFilePage(0);
  }
}
