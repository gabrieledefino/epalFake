import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService) {}

  async canActivate(): Promise<boolean> {
    if (this.hasValidTokens()) {
      return true;
    }

    this.oauthService.initCodeFlow();

    return false;
  }

  private hasValidTokens(): boolean {
    return (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    );
  }
}
