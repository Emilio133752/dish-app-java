const isProduction = false;

const environment = {
    production: isProduction,
    apiUrl: isProduction ? 'https://dishes.com.br' : 'http://localhost:8080'
};

export const getUrl = () => environment.apiUrl;