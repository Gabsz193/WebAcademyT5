import { cleanEnv, port, str, url } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    LOGS_PATH: str(),
    DB_URL: url()
  });
}

export default validateEnv;
