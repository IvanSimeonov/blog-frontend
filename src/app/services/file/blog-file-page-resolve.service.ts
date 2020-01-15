import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FilePage } from '../../api/file-page';
import { AbstractFileService } from './abstract.file.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogFilePageResolveService implements Resolve<FilePage> {

    constructor(private blogFileService: AbstractFileService) {}

    resolve(): Observable<FilePage> {
        return this.blogFileService.getFilePage(0);
    }

}
