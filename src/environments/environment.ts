interface Environment {
  production: boolean;
  apiURLBase: string;
  clientId: string;
  clientSecret: string;
  obterTokenUrl: string;
  useCookieAuth: boolean;
}

export const environment: Environment = {
  production: false,
  //apiURLBase: 'http://localhost:8087',
  apiURLBase: 'https://back-api-6bk8.onrender.com',
  clientId: 'john-app',
  clientSecret: '@2025',
  obterTokenUrl: '/oauth/token',
  useCookieAuth: false,
};
