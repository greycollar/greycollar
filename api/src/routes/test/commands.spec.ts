import test from "@nucleoidai/platform-express/test";
import request from "supertest";
import app from "../../app";
import { deepEqual } from "assert";

describe("Commands service", () => {
  beforeEach(async () => test.reset());

  it("get commands", async () => {
    test.project("add6dfa4-45ba-4da2-bc5c-5a529610b52f");
    const { body } = await request(app).get("/commands").expect(200);

    deepEqual(body, [
      {
        id: "3fbb3f27-57e1-419d-8d21-82b523b1e7d5",
        type: "KNOWLEDGE",
        name: "learn-text",
        teamId: "add6dfa4-45ba-4da2-bc5c-5a529610b52f",
        referenceId: "9b1c0eb7-5ada-44e9-bd84-0f55943809b8",
        createdAt: "2024-08-05T09:00:25.000Z",
      },
    ]);
  });

  it("get command by id", async () => {
    test.project("add6dfa4-45ba-4da2-bc5c-5a529610b52f");

    const { body } = await request(app)
      .get("/commands/3fbb3f27-57e1-419d-8d21-82b523b1e7d5")
      .expect(200);

    deepEqual(body, {
      id: "3fbb3f27-57e1-419d-8d21-82b523b1e7d5",
      type: "KNOWLEDGE",
      name: "learn-text",
      teamId: "add6dfa4-45ba-4da2-bc5c-5a529610b52f",
      referenceId: "9b1c0eb7-5ada-44e9-bd84-0f55943809b8",
      createdAt: "2024-08-05T09:00:25.000Z",
    });
  });
});
