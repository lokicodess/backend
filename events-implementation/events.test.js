// events.test.js
import { describe, it, expect, vi } from "vitest";
import Events from "./events";

describe("Events class", () => {
   it("should add event listeners", () => {
      const events = new Events();
      const mockFn = vi.fn();

      events.on("test", mockFn);
      expect(events.events["test"]).toContain(mockFn);
   });

   it("should emit events", () => {
      const events = new Events();
      const mockFn = vi.fn();

      events.on("test", mockFn);
      events.emits("test");
      expect(mockFn).toHaveBeenCalled();
   });

   it("should remove events", () => {
      const events = new Events();
      const mockFn = vi.fn();

      events.on("test", mockFn);
      events.removeEvents("test");
      expect(events.events["test"]).toBeUndefined();
   });

   it("should only trigger events once with eventsOnce", () => {
      const events = new Events();
      const mockFn = vi.fn();

      events.on("test", mockFn);
      events.eventsOnce("test");
      expect(mockFn).toHaveBeenCalled();
      expect(events.events["test"]).toBeUndefined();
   });

   it("should not emit removed events", () => {
      const events = new Events();
      const mockFn = vi.fn();

      events.on("test", mockFn);
      events.removeEvents("test");
      events.emits("test");
      expect(mockFn).not.toHaveBeenCalled();
   });
});
