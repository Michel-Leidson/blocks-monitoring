#!/bin/bash

SIGNER_ADDRESS_VALIDATOR='<YOUR SIGNER ADDRESS>'
URL_MATIC_API='<URL API MATIC>'

CONFIG_FILE=$(cat ~/collect-missed-blocks/config.json)
URL_API=$(echo $CONFIG_FILE | jq '.url_api' | sed -e 's/\"//g')
SECURITY_KEY=$(echo $CONFIG_FILE | jq '.security_key' | sed -e 's/\"//g')
COMPLETE_URL=$(echo "$URL_API$SECURITY_KEY")

while true; do

	OUTPUT_GET_MATIC_API=$(curl -X GET "$URL_MATIC_API" -s -H 'Content-Type: application/json')
	RESULT_API=$(echo $OUTPUT_GET_MATIC_API | jq '.result')
	echo $RESULT_API >/tmp/blocks-missed-matic.json

	CURRENT_BLOCK_HEIGHT=$(echo $RESULT_API | jq '.block.header.height' | sed 's/"//g')
	echo "CURRENT BLOCK: $CURRENT_BLOCK_HEIGHT"

	IS_SIGNED=$(echo $RESULT_API | jq '.block.last_commit.precommits[]? | select(.validator_address=="'$SIGNER_ADDRESS_VALIDATOR'" ) | .validator_address')

	if [ -e /tmp/matic_missed_blocks_info ]; then
		. /tmp/matic_missed_blocks_info

		echo "SAVED_BLOCK_HEIGHT=$SAVED_BLOCK_HEIGHT"
		echo "MATIC_MISSED_BLOCKS=$MATIC_MISSED_BLOCKS"

		if [ -z $IS_SIGNED ]; then
			if [ $CURRENT_BLOCK_HEIGHT = $SAVED_BLOCK_HEIGHT ]; then
				echo ""
			else
				echo "SAVED_BLOCK_HEIGHT=$CURRENT_BLOCK_HEIGHT" >/tmp/matic_missed_blocks_info
				MATIC_MISSED_BLOCKS=$(echo $((MATIC_MISSED_BLOCKS + 1)))
				echo "MATIC_MISSED_BLOCKS=$MATIC_MISSED_BLOCKS" >>/tmp/matic_missed_blocks_info
			fi
		else
			echo "BLOCK $CURRENT_BLOCK_HEIGHT WAS ASSIGN!!!"
			echo "SAVED_BLOCK_HEIGHT=$CURRENT_BLOCK_HEIGHT" >/tmp/matic_missed_blocks_info
			echo "MATIC_MISSED_BLOCKS=0" >>/tmp/matic_missed_blocks_info
		fi

	else
		echo "THERE IS NO PREVIOUS FILE... CREATING FILE"

		if [ -z $IS_SIGNED ]; then
			echo "SAVED_BLOCK_HEIGHT=$CURRENT_BLOCK_HEIGHT" >/tmp/matic_missed_blocks_info
			MATIC_MISSED_BLOCKS=1
			echo "MATIC_MISSED_BLOCKS=$MATIC_MISSED_BLOCKS" >>/tmp/matic_missed_blocks_info

		else
			echo "BLOCK $CURRENT_BLOCK_HEIGHT WAS ASSIGN!!!"
			MATIC_MISSED_BLOCKS=0
			echo "SAVED_BLOCK_HEIGHT=$CURRENT_BLOCK_HEIGHT" >/tmp/matic_missed_blocks_info
			echo "MATIC_MISSED_BLOCKS=$MATIC_MISSED_BLOCKS" >>/tmp/matic_missed_blocks_info
		fi

	fi

	curl -X POST "$COMPLETE_URL" -d '{ "missed_blocks" : '$MATIC_MISSED_BLOCKS' }' -s -H 'Content-Type: application/json'

	sleep 1
done