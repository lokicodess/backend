const http = require("node:http");

const server = http.createServer();

server.on("request", (req, res) => {
   req.on("data", (chunk) => {
      console.log(chunk.toString("utf-8"));
   });
   req.on("end", () => {
      res.writeHead(200, "ok", { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "successfully uploaded" }));
   });
});

server.listen(5050, () => {
   console.log("server is listening on port 5050");
});
