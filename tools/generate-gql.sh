#!/usr/bin/env bash

# ROOT_DIR='.'
PORT='9898'

PORT=$PORT ts-node-dev --transpile-only src/index.ts & SERVER_PID=$!
sleep 5s
gql-gen --config ./tools/codegen.yml 

kill -9 $SERVER_PID
kill -9 $(lsof -t -i:${PORT})

exit 0
