import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { map, skipWhile, Subscription, tap } from 'rxjs';

@Component({
  selector: 'oidc',
  template: '',
})
export class OidcComponent implements OnInit, OnDestroy {
  eventsSubscription: Subscription | null = null;

  constructor(
    private readonly oauthService: OAuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('[APP] Oidc page');

    this.oauthService.tryLoginCodeFlow();

    this.eventsSubscription = this.oauthService.events
      .pipe(
        tap((v) => console.log(v)),
        map(() => this.isAuthenticated()),
        skipWhile((x) => x == false)
      )
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
    this.eventsSubscription = null;
  }

  private isAuthenticated(): boolean {
    return (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    );
  }
}
