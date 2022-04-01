#!/bin/bash

MISSED_BLOCKS_FILE=$(cat /home/crypto/collect-missed-blocks/missed_blocks.json)
CONFIG_FILE=$(cat /home/crypto/collect-missed-blocks/config.json)
SECURITY_KEY=$(echo $CONFIG_FILE | jq '.security_key' | sed -e 's/\"//g')
CONSENSUS_ADDRESS=$(echo $CONFIG_FILE | jq '.consensus_address'| sed -e 's/\"//g')
URL_API=$(echo $CONFIG_FILE | jq '.url_api' | sed -e 's/\"//g')
COMPLETE_URL=$(echo "$URL_API$SECURITY_KEY")

MISSED_BLOCKS=$(echo $MISSED_BLOCKS_FILE | jq '.info[]? | select(.address=="crocnclcons1g6dvcy9r53yhmrqme9648k7fj3pudtv4cetfrc") | .missed_blocks_counter')
MISSED_BLOCKS=$(echo $MISSED_BLOCKS | sed -e 's/\"//g')

echo "Missed Blocks: $MISSED_BLOCKS"
BODY_MESSAGE='{ "missed_blocks" : '$MISSED_BLOCKS' }'
echo 'SECURITY_KEY: '$SECURITY_KEY
echo 'Send message: '$BODY_MESSAGE

while true; do
  /home/crypto/bin/chain-maind query slashing signing-infos [flags] --node tcp://localhost:26657 --limit 1000 -o json | jq  > /home/crypto/collect-missed-blocks/missed_blocks.json
  curl -X POST "$COMPLETE_URL" -d '{ "missed_blocks" : '$MISSED_BLOCKS' }' -H 'Content-Type: application/json'
  sleep 5;
done


