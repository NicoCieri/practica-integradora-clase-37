import "dotenv/config";

export default {
  PORT: process.env.PORT || 8080,
  ENV: process.env.ENV || "DEV",
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
  MONGO_LOCAL_URL: process.env.MONGO_LOCAL_URL,
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
  PERSISTENCE: process.env.PERSISTENCE,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  SECRET_COOKIES: process.env.SECRET_COOKIES,
};
