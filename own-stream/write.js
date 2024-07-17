const fs = require("fs/promises");

(async () => {
   // open the file
   const fileHandler = await fs.open("./src.txt", "w");
   const stream = fileHandler.createWriteStream();

   let i = 0;

   function writeFile() {
      while (i < 100000000) {
         const buffer = Buffer.from(`${i} `);
         if (!stream.write(buffer)) break;
         i++;
      }
   }

   writeFile();

   stream.on("drain", () => {
      writeFile();
   });
   stream.on("finish", async () => {
      // close the file
      await fileHandler.close();
   });
})();
