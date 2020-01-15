import { AbstractFileService } from './abstract.file.service';
import { FilePage } from '../../api/file-page';
import { Observable } from 'rxjs/internal/Observable';

export class BlogFileMockService extends AbstractFileService {

    getFiles(): import('rxjs').Observable<import('../../api/blog-file').BlogFileCollection> {
        throw new Error('Method not implemented.');
    }    getFile(id: number): import('rxjs').Observable<import('../../api/blog-file').BlogFile> {
        throw new Error('Method not implemented.');
    }
    uploadFile(file: File): void {
        throw new Error('Method not implemented.');
    }
    selectFile(id: string, blogFile: import('../../api/blog-file').BlogFile): void {
        throw new Error('Method not implemented.');
    }
    deleteFile(blogFile: import('../../api/blog-file').BlogFile): import('rxjs').Observable<any> {
        throw new Error('Method not implemented.');
    }
    getFileUploaded$(): import('rxjs').Observable<import('../../api/blog-file').BlogFile> {
        throw new Error('Method not implemented.');
    }
    getFileUploadProgress$(): import('rxjs').Observable<import('../../http/file-upload').FileUploadProgress> {
        throw new Error('Method not implemented.');
    }
    getFileUploadError$(): import('rxjs').Observable<import('../../http/file-upload').FileUploadError> {
        throw new Error('Method not implemented.');
    }
    getFileSelected$(): import('rxjs').Observable<{ id: string; file: import('../../api/blog-file').BlogFile; }> {
        throw new Error('Method not implemented.');
    }
    getShowHideFileManager$(): import('rxjs').Observable<{ id: string; status: boolean; }> {
        throw new Error('Method not implemented.');
    }
    showFileManager(id: string): void {
        throw new Error('Method not implemented.');
    }
    hideFileManager(id: string): void {
        throw new Error('Method not implemented.');
    }

    getFilePage(pageNumber: number): Observable<FilePage> {
        throw new Error('Method not implemented.');
    }
}
