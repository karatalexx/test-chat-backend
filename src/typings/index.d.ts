declare namespace Express {
  export interface Request {
    user?: any;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    HTTP_HOST?: string;
    HTTP_PORT?: string;
    HTTPS_HOST?: string;
    HTTPS_PORT?: string;
    HTTPS_CERTS_PHRASE?: string;
    JWT_SECRET?: string;
    JWT_ACCESS_TOKEN_TTL?: string;
    JWT_REFRESH_TOKEN_TTL?: string;
    DB_MYSQL_DEVELOPMENT_HOST?: string;
    DB_MYSQL_DEVELOPMENT_PORT?: string;
    DB_MYSQL_DEVELOPMENT_DATABASE?: string;
    DB_MYSQL_DEVELOPMENT_USERNAME?: string;
    DB_MYSQL_DEVELOPMENT_PASSWORD?: string;
    DB_MYSQL_PRODUCTION_HOST?: string;
    DB_MYSQL_PRODUCTION_PORT?: string;
    DB_MYSQL_PRODUCTION_DATABASE?: string;
    DB_MYSQL_PRODUCTION_USERNAME?: string;
    DB_MYSQL_PRODUCTION_PASSWORD?: string;
  }
}
