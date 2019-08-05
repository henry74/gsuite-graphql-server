import * as fs from "fs-extra";
import * as readline from "readline";
import envVars from "../src/config/envVars";
import { google } from "googleapis";

const GOOGLE_OAUTH2_CLIENT_ID = envVars().GOOGLE_OAUTH2_CLIENT_ID;
const GOOGLE_OAUTH2_CLIENT_SECRET = envVars().GOOGLE_OAUTH2_CLIENT_SECRET;
const GOOGLE_OAUTH2_REDIRECT_URL = envVars().GOOGLE_OAUTH2_REDIRECT_URL;
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/gmail.readonly"
];
const TOKEN_PATH = envVars().TOKEN_PATH;

const authClient = new google.auth.OAuth2(
  GOOGLE_OAUTH2_CLIENT_ID,
  GOOGLE_OAUTH2_CLIENT_SECRET,
  GOOGLE_OAUTH2_REDIRECT_URL
);

async function promptCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Enter the code from that page here: ", code => {
      rl.close();
      if (!code) reject(new Error("code required"));
      resolve(code);
    });
  });
}

async function fetchAccessTokens() {
  if (await fs.pathExists(TOKEN_PATH)) {
    const tokens = await fs.readJson(TOKEN_PATH);
    console.log(`Found cached tokens ${TOKEN_PATH}`);
    if (tokens) return tokens;
  }

  try {
    const authUrl = await authClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const code = await promptCode();
    const { tokens } = await authClient.getToken(code);

    fs.writeJson(TOKEN_PATH, tokens);
    console.log("Token stored to", TOKEN_PATH);
    return tokens;
  } catch (err) {
    console.log("Unable to fetch access token", err);
  }
}

fetchAccessTokens();
