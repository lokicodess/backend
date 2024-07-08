// Pure implementation of events

class Events {
   constructor() {
      this.events = {};
   }

   on(val, fs) {
      const allFunctions = this.events[val] ? this.events[val] : [];
      allFunctions.push(fs);
      this.events[val] = allFunctions;
   }

   removeEvents(val) {
      delete this.events[val];
   }

   emits(val) {
      const fsExist = this.events[val];
      // guard clause
      if (!fsExist || fsExist.length <= 0) return;

      fsExist.forEach((fs) => {
         fs();
      });
   }

   eventsOnce(val) {
      const fsExist = this.events[val];
      if (!fsExist || fsExist.length <= 0) return;
      this.emits(val);
      this.removeEvents(val);
   }
}

const events = new Events();

function createPizza() {
   console.log("pizza is creating ");
}
function servePizza() {
   console.log("pizza is serving");
}

events.on("pizza", createPizza);
events.on("pizza", servePizza);

events.eventsOnce("pizza");
events.emits("pizza");

console.log(events);
