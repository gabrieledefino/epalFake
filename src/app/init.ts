import { KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'https://epalpallets.westeurope.cloudapp.azure.com/kc',
        realm: 'epal-dev',
        clientId: 'epal-plattform',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
        enableLogging: true,
      },
    });
}
