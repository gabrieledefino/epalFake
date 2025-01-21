import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { initializer } from './init';
import { AppRoutingModule } from './routes';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { OidcComponent } from './oidc.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, OidcComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:4200'],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [OAuthService],
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
