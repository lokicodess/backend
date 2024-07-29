const net = require("net");
const fs = require("fs/promises");

const socket = net.createConnection({ host: "::1", port: 5055 }, () => {
   const filePath = process.argv[2];
   writeBytes(socket, filePath);
});

async function writeBytes(socket, file) {
   try {
      const fileHandler = await fs.open(file, "r");
      const readStream = await fileHandler.createReadStream();
      const totalSize = (await fs.stat(file)).size;
      socket.write(`${file}--- `);
      readStream.on("data", (data) => {
         console.log(
            `uploading file: ${(totalSize / readStream.bytesRead) * 100}%`
         );
         if (!socket.write(data)) {
            readStream.pause();
         }
      });
      socket.on("drain", () => {
         readStream.resume();
      });
      readStream.on("end", () => {
         console.log("file uploaded successfully");
         socket.end();
         fileHandler.close();
      });
   } catch (error) {
      console.log("there is some error \n");
      console.log(error);
   }
}
