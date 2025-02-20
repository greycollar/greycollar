import test from "@nucleoidai/platform-express/test";
import request from "supertest";
import app from "../../app";
import { deepEqual } from "assert";

describe("Tasks service", () => {
  beforeEach(async () => test.reset());

  it("creates a task", async () => {
    test.project("add6dfa4-45ba-4da2-bc5c-5a529610b52f");

    const { body } = await request(app)
      .post("/tasks")
      .send({
        description: "Find closing hours of Dark-sided Coffee Shop",
        status: "IN_PROGRESS",
        colleagueId: "00db1bd4-4829-40f2-8b99-d2e42342157e",
      })
      .expect(201);

    deepEqual(body, {
      id: body.id,
      description: "Find closing hours of Dark-sided Coffee Shop",
      status: "IN_PROGRESS",
      createdAt: body.createdAt,
      colleagueId: "00db1bd4-4829-40f2-8b99-d2e42342157e",
    });
  });

  it("gets task", async () => {
    test.project("add6dfa4-45ba-4da2-bc5c-5a529610b52f");

    const { body } = await request(app).get("/tasks").expect(200);

    deepEqual(body, [
      {
        id: "8c88d077-99f1-482a-8575-879187b11ec9",
        description: "Find closing hours of Dark-sided Coffee Shop",
        status: "IN_PROGRESS",
        commandId: "3fbb3f27-57e1-419d-8d21-82b523b1e7d5",
        createdAt: "2025-01-19T10:34:20.094Z",
        colleagueId: "00db1bd4-4829-40f2-8b99-d2e42342157e",
      },
    ]);
  });

  it("gets task progresses", async () => {
    test.project("add6dfa4-45ba-4da2-bc5c-5a529610b52f");

    const { body } = await request(app)
      .get("/tasks/8c88d077-99f1-482a-8575-879187b11ec9/progresses")
      .expect(200);

    deepEqual(body, [
      {
        id: "12b6c58a-5f9f-4d9f-89b2-c9e420848e9b",
        description: "Scrapping the egg.com website",
        type: "TASK",
        referenceId: "8c88d077-99f1-482a-8575-879187b11ec9",
        createdAt: "2023-08-05T12:00:25.000Z",
      },
    ]);
  });

  it("gets task by id", async () => {
    test.project("add6dfa4-45ba-4da2-bc5c-5a529610b52f");

    const { body } = await request(app)
      .get("/tasks/8c88d077-99f1-482a-8575-879187b11ec9")
      .expect(200);

    deepEqual(body, {
      id: "8c88d077-99f1-482a-8575-879187b11ec9",
      description: "Find closing hours of Dark-sided Coffee Shop",
      status: "IN_PROGRESS",
      commandId: "3fbb3f27-57e1-419d-8d21-82b523b1e7d5",
      createdAt: "2025-01-19T10:34:20.094Z",
      colleagueId: "00db1bd4-4829-40f2-8b99-d2e42342157e",
    });
  });
});
