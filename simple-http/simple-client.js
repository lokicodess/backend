const http = require("node:http");

const agent = new http.Agent({ keepAlive: true });

const request = http.request({
   agent: agent,
   hostname: "localhost",
   port: 5050,
   method: "POST",
   path: "/create-post",
   headers: {
      "Content-type": "application/json",
   },
});

// this event is emitted only once
request.on("response", (res) => {
   console.log("method is", res.method);
   console.log("header is ", res.headers);
   res.on("data", (chunk) => {
      console.log(chunk.toString("utf-8"));
   });
});

request.write(JSON.stringify({ message: "Hi there!" }));
request.write(JSON.stringify({ message: "how are you " }));
request.write(JSON.stringify({ message: "are you there" }));

request.end();
