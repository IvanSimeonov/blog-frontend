import { Injectable } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService {

  constructor(private keycloakService: KeycloakService) { }

  //resolve(): Observable
}