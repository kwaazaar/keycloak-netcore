import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private oauthService: OAuthService) { }

  login() { this.oauthService.initImplicitFlow(); }
  logout() { this.oauthService.logOut(); }

  get givenName() {
     const claims = this.oauthService.getIdentityClaims() as any;
     if (!claims) {
        console.log('no claims found');
       return null;
     }

     console.log('claims found!', claims);

     return claims.given_name;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
