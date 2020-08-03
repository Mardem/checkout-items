export const pagSeguro = {
  appToken: 'PUB0351BD34465B4DF2A47D0D6A9DFB5419',
  emailAccount: 'mardenmc22@gmail.com',
  urls: {
    sandbox: 'https://ws.pagseguro.uol.com.br/v2',
    production: 'https://ws.pagseguro.uol.com.br/v2',
    generateToken: (): string => {
      return `${pagSeguro.urls.sandbox}/sessions?email=${pagSeguro.emailAccount}&token=${pagSeguro.appToken}`;
    }
  }
};
