import * as test from "@nucleoidai/platform-express/test";

import app from "../../app";
import { deepEqual } from "assert";
import request from "supertest";

describe("Knowledge service", () => {
  beforeEach(async () => test.reset());

  it("creates QA type knowledge", async () => {
    test.project("e6d4744d-a11b-4c75-acad-e24a02903729");

    const { body: postBody } = await request(app)
      .post("/knowledge")
      .send({
        type: "QA",
        question: "What time does the store close in weekends?",
        answer: "The store closes 5pm in weekends",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      })
      .expect(201);

    const { body } = await request(app).get(`/knowledge/${postBody.id}`);

    deepEqual(body, {
      id: body.id,
      type: "QA",
      question: "What time does the store close in weekends?",
      answer: "The store closes 5pm in weekends",
      url: null,
      text: null,
      content: null,
      status: "IN_PROGRESS",
      createdAt: body.createdAt,
      colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
    });
  });

  it.skip("creates URL type knowledge", async function () {
    // this.timeout(10000);
    test.project("add6dfa4-45ba-4da2-bc5c-5a529610b52f");

    const { body: postBody } = await request(app)
      .post("/knowledge")
      .send({
        type: "URL",
        url: "https://www.selenium.dev/selenium/web/window_switching_tests/simple_page.html",
        colleagueId: "00db1bd4-4829-40f2-8b99-d2e42342157e",
      })
      .expect(201);

    const { body } = await request(app).get(`/knowledge/${postBody.id}`);

    deepEqual(body, {
      id: body.id,
      type: "URL",
      question: null,
      answer: null,
      url: "https://www.google.com",
      text: null,
      content: "Simple page with simple test.",
      status: "IN_PROGRESS",
      createdAt: body.createdAt,
      colleagueId: "00db1bd4-4829-40f2-8b99-d2e42342157e",
    });
  });

  it("creates TEXT type knowledge", async () => {
    test.project("add6dfa4-45ba-4da2-bc5c-5a529610b52f");

    const { body: postBody } = await request(app)
      .post("/knowledge")
      .send({
        type: "TEXT",
        text: "Avaible Positions",
        colleagueId: "00db1bd4-4829-40f2-8b99-d2e42342157e",
      })
      .expect(201);

    const { body } = await request(app).get(`/knowledge/${postBody.id}`);

    deepEqual(body, {
      id: body.id,
      type: "TEXT",
      question: null,
      answer: null,
      url: null,
      content: null,
      text: "Avaible Positions",
      status: "IN_PROGRESS",
      createdAt: body.createdAt,
      colleagueId: "00db1bd4-4829-40f2-8b99-d2e42342157e",
    });
  });

  it("gets all knowledge", async () => {
    test.project("e6d4744d-a11b-4c75-acad-e24a02903729");

    const { body } = await request(app).get("/knowledge").expect(200);
    deepEqual(body, [
      {
        id: "0b6e8e55-3d02-4f59-966f-e6339ba27095",
        type: "URL",
        question: null,
        answer: null,
        content: null,
        url: "https://www.financialmanagementandstrategy.com/resources",
        text: null,
        status: "COMPLETED",
        createdAt: "1970-01-20T22:08:14.307Z",
      },
      {
        id: "17f4a185-c81c-4be5-a6ee-fdd38fdb2b1a",
        type: "QA",
        question:
          "What are the key components of an effective financial strategy?",
        answer:
          "The key components of an effective financial strategy include budgeting, forecasting, risk management, investment planning, and performance measurement.",
        url: null,
        text: null,
        content: null,
        status: "COMPLETED",
        createdAt: "1970-01-20T22:08:14.307Z",
      },
      {
        id: "81a97af4-75ce-473c-9106-2bdfb86abf80",
        type: "URL",
        question: null,
        answer: null,
        content: null,
        url: "https://www.customerservicebestpractices.com/resources",
        text: null,
        status: "COMPLETED",
        createdAt: "1970-01-20T22:08:14.324Z",
      },
      {
        id: "eab826a3-2566-4ac9-abaf-c3a31b947059",
        type: "TEXT",
        question: null,
        answer: null,
        url: null,
        content: null,
        text: "In-progress report on customer service trends and improvements.",
        status: "COMPLETED",
        createdAt: "1970-01-20T22:08:14.324Z",
      },
    ]);
  });

  it("gets knowledge by colleagueId query", async () => {
    const { body } = await request(app)
      .get("/knowledge?colleagueId=72ef5b08-b4a9-42b7-bb0a-22d40e56798b")
      .expect(200);

    deepEqual(body, [
      {
        id: "8a743824-3a4c-4d96-b235-34a2f0c19dd0",
        type: "TEXT",
        question: null,
        answer: null,
        url: null,
        content: null,
        text: "Latest trends in financial management and strategy.",
        status: "COMPLETED",
        createdAt: "1970-01-20T22:08:14.337Z",
      },
    ]);
  });

  it("update knowledge", async () => {
    await request(app)
      .patch("/knowledge/9a1c0eb7-5ada-44e9-bd84-0f55943809b8")
      .send({
        question:
          "What are the essential skills for a successful customer service representative?",
      })
      .expect(204);

    const { body: upcreatedAtdBody } = await request(app).get(
      "/knowledge/9a1c0eb7-5ada-44e9-bd84-0f55943809b8"
    );

    deepEqual(upcreatedAtdBody, {
      id: "9a1c0eb7-5ada-44e9-bd84-0f55943809b8",
      type: "QA",
      text: null,
      url: null,
      content: null,
      question:
        "What are the essential skills for a successful customer service representative?",
      answer:
        "Key qualities of an effective customer service representative include strong communication skills, empathy, problem-solving abilities, patience, and product knowledge.",
      status: "COMPLETED",
      createdAt: "1970-01-20T22:08:14.324Z",
      colleagueId: "ef906c5d-cafe-4518-9edc-b80c605df58e",
    });
  });

  it("deletes knowledge", async () => {
    await request(app)
      .delete("/knowledge/9a1c0eb7-5ada-44e9-bd84-0f55943809b8")
      .expect(204);

    await request(app)
      .get("/knowledge/9a1c0eb7-5ada-44e9-bd84-0f55943809b8")
      .expect(404);
  });

  it("should return 400 when creating QA type knowledge with only answer", async () => {
    await request(app)
      .post("/knowledge")
      .send({
        type: "QA",
        answer: "The store closes at 5pm on weekends",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      })
      .expect(400);
  });

  it("should return 400 when creating QA type knowledge with only question", async () => {
    await request(app)
      .post("/knowledge")
      .send({
        type: "QA",
        question: "What time does the store close on weekends?",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      })
      .expect(400);
  });

  it("should return 400 when creating TEXT type knowledge with invalid input", async () => {
    await request(app)
      .post("/knowledge")
      .send({
        type: "TEXT",
        url: "The store closes at 5pm on weekends",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      })
      .expect(400);
  });

  it("should return 400 when creating URL type knowledge with invalid input", async () => {
    await request(app)
      .post("/knowledge")
      .send({
        type: "URL",
        text: "The store closes at 5pm on weekends",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      })
      .expect(400);
  });

  it("should return 400 when creating QA type knowledge with colleagueId and teamId", async () => {
    await request(app)
      .post("/knowledge")
      .send({
        type: "QA",
        question: "What time does the store close on weekends?",
        answer: "The store closes at 5pm on weekends",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
        teamId: "e6d4744d-a11b-4c75-acad-e24a02903729",
      })
      .expect(400);
  });

  it("should return 400 when creating QA type knowledge with QA and text", async () => {
    await request(app)
      .post("/knowledge")
      .send({
        type: "QA",
        question: "What time does the store close on weekends?",
        answer: "The store closes at 5pm on weekends",
        text: "Avaible Positions",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      })
      .expect(400);
  });
});
