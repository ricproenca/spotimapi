# spotimapi

## Folder Structure

https://medium.com/swlh/how-i-structure-my-node-js-rest-apis-4e8904ccd2fb

```text
/src            - source code of the project
  /db           - database scripts
  /api            - everything needed for the REST API
    /components
      /user       - controllers, models, schema, service
    /middleware   - API middleware
  /config       - global configuration files
  /services     - services for sending mails, caching, authentication and more
  /test         - test factory
  /utils        - utils
```

## tools

- Postman
- CircleCI
- Online RSA Key Generator https://travistidwell.com/jsencrypt/demo/

## todo

- custom log levels
- change filenames model => userModel
- add unit tests
- log https://betterstack.com/community/guides/logging/node-js/how-to-install-setup-and-use-pino-to-log-node-js-applications
