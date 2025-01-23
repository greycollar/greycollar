import { subscribe, publish, messages } from "../Event";

describe("node-event", () => {
  it("accepts type and payload", () => {
    expect(() => publish("TEST_EVENT")).toThrow();
  });

  it("subscribes and publishes events", (done) => {
    subscribe("TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
    });

    subscribe("TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
      done();
    });

    publish("TEST_EVENT", { number: 10, string: "blue" });
  });

  it("publishes and subscribes events", (done) => {
    publish("TEST_EVENT", { number: 10, string: "blue" });

    subscribe("TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
      done();
    });
  });

  it("notifies all subscribers of an event", (done) => {
    let receivedByFirstSubscriber = false;
    let receivedBySecondSubscriber = false;

    const checkDone = () => {
      if (receivedByFirstSubscriber && receivedBySecondSubscriber) {
        done();
      }
    };

    subscribe("MULTI_SUB_EVENT", (result) => {
      expect(result).toMatchObject({ data: "shared" });
      receivedByFirstSubscriber = true;
      checkDone();
    });

    subscribe("MULTI_SUB_EVENT", (result) => {
      expect(result).toMatchObject({ data: "shared" });
      receivedBySecondSubscriber = true;
      checkDone();
    });

    publish("MULTI_SUB_EVENT", { data: "shared" });
  });

  it("handles events with no subscribers without errors", () => {
    expect(() =>
      publish("NO_SUBSCRIBER_EVENT", { data: "none" })
    ).not.toThrow();
  });

  it("registers the last published event to map", () => {
    publish("LAST_EVENT", { data: "test payload" });

    const lastPublishedEvent = messages.get("LAST_EVENT");
    expect(lastPublishedEvent).toEqual({ data: "test payload" });
  });

  it("returns registry in callback", (done) => {
    publish("CALLBACK_REGISTRY_EVENT", { data: "test payload" });

    subscribe("CALLBACK_REGISTRY_EVENT", (result, registry) => {
      expect(result).toMatchObject({ data: "test payload" });
      expect(registry).toMatchObject({
        id: expect.any(String),
        type: "CALLBACK_REGISTRY_EVENT",
        callback: expect.any(Function),
        unsubscribe: expect.any(Function),
      });

      registry.unsubscribe();
    });

    subscribe("CALLBACK_REGISTRY_EVENT_2", (result, registry) => {
      expect(result).toMatchObject({ data: "test payload 2" });
      expect(registry).toMatchObject({
        id: expect.any(String),
        type: "CALLBACK_REGISTRY_EVENT_2",
        callback: expect.any(Function),
        unsubscribe: expect.any(Function),
      });

      registry.unsubscribe();

      done();
    });

    publish("CALLBACK_REGISTRY_EVENT_2", { data: "test payload 2" });
  });

  it("supports namespaced events", (done) => {
    subscribe("NAMESPACE_1", "NAMESPACE_2", "TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
      done();
    });

    publish("NAMESPACE_1", "NAMESPACE_2", "TEST_EVENT", {
      number: 10,
      string: "blue",
    });
  });
});
