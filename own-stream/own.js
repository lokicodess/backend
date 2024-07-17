const fs = require("fs/promises");

(async () => {
   const writeFileHandler = await fs.open("./dest.txt", "w");
   const readFileHandler = await fs.open("./src.txt", "r");

   let bytesRead = -1;
   while (bytesRead !== 0) {
      const readBuffer = await readFileHandler.read();
      bytesRead = readBuffer.bytesRead;
      if (bytesRead !== 16384) {
         const idxNotFill = readBuffer.buffer.indexOf(0); // got first zero at 15731
         const newBuffer = Buffer.alloc(idxNotFill); // created the buffer of 15731
         readBuffer.buffer.copy(newBuffer, 0, 0, idxNotFill); // filled the buffer till 15731
         await writeFileHandler.write(newBuffer); // written to the dest file
      } else {
         await writeFileHandler.write(readBuffer.buffer);
      }
   }
})();
