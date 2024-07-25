const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

async function lineUp(dx, dy) {
   return new Promise((res, rej) => {
      process.stdout.moveCursor(dx, dy, () => {
         res();
      });
   });
}

async function clearLine(dir) {
   return new Promise((res, rej) => {
      process.stdout.clearLine(dir, () => {
         res();
      });
   });
}

const socket = net.createConnection(
   { port: 4000, host: "127.0.0.1" },
   async () => {
      async function ask() {
         const message = await rl.question("write your message:- ");
         await lineUp(0, -1);
         await clearLine(0);
         socket.write(message);
      }

      ask();

      socket.on("data", async (data) => {
         console.log();
         await lineUp(0, -1);
         await clearLine(0);
         console.log(data.toString());
         ask();
      });
   }
);
