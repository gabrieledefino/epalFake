import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  template: `<router-outlet> </router-outlet> `,
})
export class AppComponent implements OnInit {
  constructor(private readonly oauthService: OAuthService) {}

  ngOnInit(): void {
  }
}
