declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_SECRET_KEY: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_URL: string;
    USER: string;
    PASS: string;
    PORT:string
  }
}
