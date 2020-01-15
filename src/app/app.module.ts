import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './http/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AbstractArticleService } from './services/article/abstract.article.service';
import { ArticleService } from './services/article/article.service';
import { AbstractKeycloakService } from './services/keycloak/abstract.keycloak.service';

import { AbstractFileService } from './services/file/abstract.file.service';
import { FileService } from './services/file/file.service';
import { MessageService } from './services/message/message.service';
import { PublicSiteModule } from './public-site/public-site.module';
import { RoutingService } from './routing.service';
import { MenuService } from './services/page/menu.service';
import { KeycloakMockService } from './services/keycloak/keycloak-mock.service';
import { KeycloakTokenParsed } from './type/keycloak';
import { RouterLinkDirectiveStub } from './testing/router-link-directive-stub';

import { environment } from './../environments/environment';
import { SharedModule } from './shared/shared.module';


export function getKeycloakServiceFactory(httpClient: HttpClient): AbstractKeycloakService {
  if (environment.mockSecurity) {
    // tslint:disable-next-line: no-console
    console.info('MOCKING SECURITY...');
    const mockKeycloakTokenParsed: KeycloakTokenParsed = {
      realm_access: { roles: ['user', 'publisher', 'admin'] },
      preferred_username: 'MOCK-ADMIN'
    };
    return new KeycloakMockService(true, true, mockKeycloakTokenParsed);
  } else {
    return new KeycloakService(httpClient);
  }
}

export function kcFactory(keycloakService: AbstractKeycloakService) {
  return () => keycloakService.init();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    /* AdminModule, */
    AppRoutingModule,
    PublicSiteModule,
    SharedModule
  ],
  providers: [
    { provide: AbstractArticleService, useClass: ArticleService },
    { provide: AbstractKeycloakService, useFactory: getKeycloakServiceFactory, deps: [HttpClient] },
    { provide: AbstractFileService, useClass: FileService },
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [AbstractKeycloakService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    RoutingService,
    MenuService
  ],

  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
