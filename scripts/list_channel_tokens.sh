curl -X GET https://api.line.me/oauth2/v2.1/tokens/kid \
--data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
--data-urlencode "client_assertion=$JWT" \
-G
