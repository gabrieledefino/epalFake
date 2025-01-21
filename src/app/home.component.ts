import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  apiTimestamp: Date = new Date();
  pageTimestamp: Date = new Date();

  data: unknown = null;

  apiHandle: number | null = null;

  constructor(private httpService: HttpClient) {}

  ngOnDestroy(): void {
    if (this.apiHandle) {
      clearInterval(this.apiHandle);
    }
  }

  ngOnInit(): void {
    console.log('[APP] Home page');

    this.apiHandle = setInterval(() => {
      this.httpService
        .get('http://localhost:4200/api/notifications')
        .subscribe({
          next: (data) => {
            this.apiTimestamp = new Date();
            this.data = data;
          },
        });
    }, 1000);
  }
}
