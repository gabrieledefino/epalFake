import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer:
    'https://epalpallets.westeurope.cloudapp.azure.com/kc/realms/epal-dev',
  redirectUri: 'http://localhost:4200/oidc',
  clientId: 'epal-plattform',
  responseType: 'code',
  scope: 'openid',
  showDebugInformation: true,
  requireHttps: false,
};

export function initializer(oauthService: OAuthService): () => Promise<void> {
  return async function (): Promise<void> {
    console.log('[APP] Initting OAuth');

    oauthService.configure(authCodeFlowConfig);
    await oauthService.loadDiscoveryDocument();
    oauthService.setupAutomaticSilentRefresh();
  };
}
