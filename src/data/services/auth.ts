import { google } from "googleapis";
import envVars from "../../config/envVars";
import { OAuth2Client } from "googleapis-common";
import * as fs from "fs-extra";
import logger from "../../util/logger";

const GOOGLE_OAUTH2_CLIENT_ID = envVars().GOOGLE_OAUTH2_CLIENT_ID;
const GOOGLE_OAUTH2_CLIENT_SECRET = envVars().GOOGLE_OAUTH2_CLIENT_SECRET;
const GOOGLE_OAUTH2_REDIRECT_URL = envVars().GOOGLE_OAUTH2_REDIRECT_URL;
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.readonly"
];
const TOKEN_PATH = envVars().TOKEN_PATH;

const authClient = new google.auth.OAuth2(
  GOOGLE_OAUTH2_CLIENT_ID,
  GOOGLE_OAUTH2_CLIENT_SECRET,
  GOOGLE_OAUTH2_REDIRECT_URL
);

async function fetchAccessTokens() {
  if (await fs.pathExists(TOKEN_PATH)) {
    const tokens = await fs.readJson(TOKEN_PATH);
    // logger.debug(`Found cached tokens ${TOKEN_PATH}`);
    if (tokens) return tokens;
  }
  logger.error("No tokens found - please authorize");
  return "";
}

export const fetchAuthClient = async (): Promise<OAuth2Client> => {
  const tokens = await fetchAccessTokens();
  authClient.setCredentials(tokens);
  return authClient;
};

export const setOAuthCode = async (code: string) => {
  const { tokens } = await authClient.getToken(code);
  fs.writeJson(TOKEN_PATH, tokens);
  logger.debug("Token stored to", TOKEN_PATH);
  return tokens;
};

export const authUrl = async (): Promise<String> => {
  const authUrl = await authClient.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  return authUrl;
};
