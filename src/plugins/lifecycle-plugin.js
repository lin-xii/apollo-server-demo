function serverLifeCycle() {
  return {
    async serverWillStart() {
      console.log("Top-Server: serverWillStart");
      return {
        async schemaDidLoadOrUpdate({ apiSchema, coreSupergraphSdl }) {
          console.log("Server is running: schemaDidLoadOrUpdate");
          console.log(`The API schema is `, JSON.stringify(apiSchema));
          if (coreSupergraphSdl) {
            console.log(`The core schema is ${coreSupergraphSdl}`);
          }
        },
        async renderLandingPage() {
          console.log("Server is running: renderLandingPage");
          const html = `
              <!DOCTYPE html>
              <html>
                  <head>
                  </head>
                  <body>
                      <h1>Hello Lifecycle!</h1>
                  </body>
              </html>`;
          return { html };
        },
        async requestDidStart(requestContext) {
          console.log("Server is running: requestDidStart");
        },
        async drainServer() {
          console.log("Server will stop: drainServer");
        },
        async serverWillStop() {
          console.log("Server will stop: serverWillStop");
        },
      };
    },
    async startUpDidFail(err) {
      console.log("Top-Server: startUpDidFail", err);
    },
  };
}

let requestCount = 0;

function requestLifeCycle() {
  return {
    async requestDidStart(initalRequestContext) {
      // Within this returned object, define functions that respond
      // to request-specific lifecycle events.
      return {
        //
        async didResolveSource(requestContext) {
          // console.log(
          //   "Request is running: didResolveSource",
          //   // requestContext.source,
          //   requestContext.queryHash // APQ优化可用的sha256
          // );
        },
        // The `parsingDidStart` request lifecycle event fires
        // when parsing begins. The event is scoped within an
        // associated `requestDidStart` server lifecycle event.
        // 原文中的Apollo Server's cache. 可能是指operation，并非response
        async parsingDidStart(requestContext) {
          requestCount++;
          console.log("Request is running: parsingDidStart", requestCount);
          // console.log("Request is running: parsingDidStart", requestContext);
        },
        async validationDidStart(requestContext) {
          // source, queryHash, document
          console.log("Request is running: validationDidStart");
        },
        async didResolveOperation(requestContext) {
          // 'source' | 'queryHash' | 'document' | 'operationName'
          // console.log(
          //   "Request is running: didResolveOperation",
          //   requestContext.operationName
          // );
        },
        async responseForOperation(requestContext) {
          // 'source' | 'queryHash' | 'document' | 'operationName' | 'operation'
          // console.log(
          //   "Request is running: responseForOperation",
          //   requestContext.operation
          // );
        },
        async executionDidStart(requestContext) {
          // 'source' | 'queryHash' | 'document' | 'operationName' | 'operation'
          // console.log("Request is running: executionDidStart");
          return {
            // 因为有info，和@cacheControl串联起来了。可以在这里做缓存
            willResolveField({ source, args, contextValue, info }) {
              // console.log("Resolving field");
              const start = process.hrtime.bigint();
              return (error, result) => {
                const end = process.hrtime.bigint();
                // console.log(
                //   `Field ${info.parentType.name}.${info.fieldName} took ${
                //     end - start
                //   }ns`
                // );
                if (error) {
                  console.log(`It failed with ${error}`);
                } else {
                  // console.log(`It returned ${result}`);
                }
              };
            },
          };
        },
        async didEncounterErrors(requestContext) {
          console.log(
            "Request is running: didEncounterErrors",
            requestContext.errors
          );
        },
        async didEncounterSubsequentErrors(requestContext, errors) {
          console.log(
            "Request is running: didEncounterSubsequentErrors",
            errors
          );
        },
        async willSendResponse(requestContext) {
          // 'source' | 'queryHash'
          // console.log("Request is running: willSendResponse");
        },
        async willSendSubsequentPayloads(requestContext, payloads) {
          // 'source' | 'queryHash'
          console.log(
            "Request is running: willSendSubsequentPayloads",
            payloads
          );
        },
      };
    },
  };
}

async function contextCreationDidFail({ error }) {
  console.log("contextCreationDidFail", error);
}

async function invalidRequestWasReceived({ error }) {
  console.log("invalidRequestWasReceived", error);
}

async function unexpectedErrorProcessingRequest({ requestContext, error }) {
  console.log("unexpectedErrorProcessingRequest", error);
}

export {
  serverLifeCycle,
  requestLifeCycle,
  contextCreationDidFail,
  invalidRequestWasReceived,
  unexpectedErrorProcessingRequest,
};
