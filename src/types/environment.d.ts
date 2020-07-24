declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_SECRET: string;
      NODE_ENV: 'development' | 'production';
      ACCOUNT_NAME: string;
      ACCOUNT_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
