const { write } = require("fs");
const fs = require("fs/promises");

(async function () {
   // commands
   const CREATE_FILE = "create a file";
   const DELETE_FILE = "delete the file";
   const RENAME_FILE = "rename the file";
   const ADD_TO_FILE = "add to the file ";
   // create a file
   const cr = async (path) => {
      try {
         // check if the file exist
         const existFileHandler = await fs.open(path, "r");
         existFileHandler.close();
      } catch (error) {
         // get error means we dont have that file, create one.
         const createFileHandler = await fs.open(path, "w");
         createFileHandler.close();
      }
   };

   const dl = async (path) => {
      try {
         await fs.unlink(path);
      } catch (error) {
         console.log(error.message);
      }
   };

   const rm = async (oldpath, newPath) => {
      try {
         await fs.rename(oldpath, newPath);
      } catch (error) {
         console.log(error.message);
      }
   };

   const atf = async (path, content) => {
      try {
         // open the file
         const writeFileHandler = await fs.open(path, "a");
         await writeFileHandler.write(content);
         writeFileHandler.close();
      } catch (error) {
         console.log(error);
      }
   };

   // opening the file
   const fileHandler = await fs.open("./command.txt", "r");

   fileHandler.on("change", async () => {
      // Get the size of the file
      const size = (await fileHandler.stat()).size;
      // create the buffer of that size
      const buff = Buffer.alloc(size);
      // options
      const offset = 0;
      const length = buff.byteLength;
      const position = 0;
      // read the file
      const fileContent = await fileHandler.read(
         buff,
         offset,
         length,
         position
      );
      const command = fileContent.buffer.toString("utf-8");

      // check if it has create a file command
      if (command.includes(CREATE_FILE)) {
         const filePath = command.substring(CREATE_FILE.length + 1);
         cr(filePath);
      }
      if (command.includes(DELETE_FILE)) {
         const filePath = command.substring(DELETE_FILE.length + 1);
         dl(filePath);
      }
      if (command.includes(RENAME_FILE)) {
         // command -->  rename the file oldPath to newPath
         const idx = command.indexOf(" to");
         const oldPath = command.substring(RENAME_FILE.length + 1, idx);
         const newPath = command.substring(idx + 4);
         rm(oldPath, newPath);
      }
      if (command.includes(ADD_TO_FILE)) {
         // command -->  add to the file ./dog.txt this content: <content
         const idx = command.indexOf(" this content: ");
         const filePath = command.substring(ADD_TO_FILE.length, idx);
         const content = command.substring(idx + 15);
         atf(filePath, content);
      }
   });

   const watcher = fs.watch("./command.txt");

   for await (const events of watcher) {
      if (events.eventType === "change") {
         fileHandler.emit("change");
         console.log("file is changed");
      }
   }
})();
