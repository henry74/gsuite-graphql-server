# Simple GraphQL API for Google Apps (Calendar, Sheets, Gmail)

## Setup

1. Create a new Google project and enable Google Calendar, Sheets, and Gmail API
2. Create `OAuth 2.0 client ID` credentials
3. Copy `Client ID` and `Client Secret` into .env

```bash
# See .env.example for required environment variables
```

Generate token manually (can also be done through API)

```
yarn authorize
```

## Building Docker Images

Build image for x86 architecture

```bash
docker build -t your.registry.domain/path/gsuite-graphql-api .
```

Build image on x86 architecture for ARM7 architecture (e.g. Raspberry Pi)

```bash
docker build -f armv7hf.Dockerfile -t your.registry.domain/path/gsuite-graphql-api:armv7hf .
```

## API Usage

Terminal/CLI

```bash
yarn start # start graphql playground on http://localhost:4000
```

Dockerfile (after building)

```
docker run -d \
   -p 4001:4000 \
   -e GOOGLE_OAUTH2_CLIENT_ID="123412341234-randombunchofcharacters.apps.googleusercontent.com" \
   -e GOOGLE_OAUTH2_CLIENT_SECRET="1234asdf1234" \
   -e GOOGLE_OAUTH2_REDIRECT_URL="urn:ietf:wg:oauth:2.0:oob" \
   -e TOKEN_PATH=./token.json \
   your/image:latest
```

**spreadsheetId** is located in the spreadsheet URL: `https://docs.google.com/spreadsheet/d/`spreadsheetId`/edit`

Click schema tab within graphQL playground for details
