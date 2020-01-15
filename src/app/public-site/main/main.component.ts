import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractArticleService } from './../../services/article/abstract.article.service';
import { AbstractKeycloakService } from './../../services/keycloak/abstract.keycloak.service';
import { Subscription, Observable } from 'rxjs';
import { KeycloakProfile, KeycloakTokenParsed } from './../../type/keycloak';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { MessageService } from './../../services/message/message.service';
import { Menu } from './../../api/menu';
import { RoutingService } from './../../routing.service';
import { SettingsService } from './../../services/settings/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  username: string = null;
  profile: KeycloakTokenParsed = null;


  canUserCreateArticles = false;
  showOwnArticles = false;
  canUserPublishArticles = false;
  currentUrl: string;
  menu: Menu;

  logoUrl$: Observable<string>;

  private subscriptions: Array<Subscription> = [];

  constructor(private articleService: AbstractArticleService,
    private keycloakService: AbstractKeycloakService,
    private routingService: RoutingService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private settingsService: SettingsService) {}

  ngOnInit(): void {
    console.log('MAIN COMPONENT CREATED!');

    this.subscriptions.push(
      this.routingService.currentUrl$.subscribe(url => {this.currentUrl = url; })
    );

    this.subscriptions.push(
    this.keycloakService.getKeycloakTokenParsed$().subscribe((profile) => {
      this.profile = profile;
      console.log('USER PROFILE', this.profile);
    })
    );
    this.subscriptions.push(
    this.activatedRoute.data.subscribe(data => {
      console.log('Menu is: ', data.menu);
      this.menu = data.menu;
    })
    );

    this.subscriptions.push(
      this.messageService.messages$.subscribe(msg => {
        window.alert(msg);
      })
    );

    this.logoUrl$ = this.settingsService.logoImageUrl$;

    this.canUserCreateArticles = this.keycloakService.canCreateArticles();
    this.showOwnArticles = this.canUserCreateArticles;
    this.canUserPublishArticles = this.keycloakService.canPublishArticles();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }


}
