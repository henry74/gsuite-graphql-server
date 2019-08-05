import * as dotenv from "dotenv-safe";

dotenv.config();

const ENVIRONMENT_VARIABLES = {
  GOOGLE_OAUTH2_CLIENT_ID: "",
  GOOGLE_OAUTH2_CLIENT_SECRET: "",
  GOOGLE_OAUTH2_REDIRECT_URL: "",
  TOKEN_PATH: ""
};

let fetched: boolean = false;

const fetchEnvVar = envVarName => {
  ENVIRONMENT_VARIABLES[envVarName] =
    process.env[envVarName] || ENVIRONMENT_VARIABLES[envVarName] || "";
};

export default function envVars() {
  if (fetched) {
    return ENVIRONMENT_VARIABLES;
  }
  Object.keys(ENVIRONMENT_VARIABLES).map(fetchEnvVar);
  Object.freeze(ENVIRONMENT_VARIABLES);
  fetched = true;
  return ENVIRONMENT_VARIABLES;
}
