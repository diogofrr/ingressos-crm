import "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      AUTH_SECRET: string;
      AMBIENT: 'DEV' | 'PROD';
    }
  }
}

declare module 'daisyui';