import test from "@nucleoidai/platform-express/test";
import request from "supertest";
import app from "../../app";
import { deepEqual } from "assert";

describe("Supervisings service", () => {
  beforeEach(async () => test.reset());

  it("create a new supervise", async () => {
    test.project("e6d4744d-a11b-4c75-acad-e24a02903729");

    const { body } = await request(app)
      .post("/supervisings")
      .send({
        conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      })
      .expect(201);

    deepEqual(body, {
      id: body.id,
      conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
      sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
      colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      question: "What time do you close?",
      createdAt: body.createdAt,
      status: "IN_PROGRESS",
    });

    const { body: supervisings } = await request(app)
      .get("/colleagues/72ef5b08-b4a9-42b7-bb0a-22d40e56798b/supervisings")
      .expect(200);

    console.log(supervisings);

    deepEqual(supervisings, [
      {
        id: "d92da3ee-521c-4b93-9770-c38dcea173a5",
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
        question: "What time do you close?",
        answer: null,
        createdAt: "2023-08-06T12:00:00.000Z",
        status: "IN_PROGRESS",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      },
      {
        id: body.id,
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
        question: "What time do you close?",
        answer: null,
        createdAt: body.createdAt,
        status: "IN_PROGRESS",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      },
    ]);
  });

  it("gets supervisings by colleagueId", async () => {
    test.project("e6d4744d-a11b-4c75-acad-e24a02903729");

    const { body } = await request(app)
      .get("/colleagues/72ef5b08-b4a9-42b7-bb0a-22d40e56798b/supervisings")
      .expect(200);

    deepEqual(body, [
      {
        id: "d92da3ee-521c-4b93-9770-c38dcea173a5",
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
        question: "What time do you close?",
        answer: null,
        status: "IN_PROGRESS",
        createdAt: "2023-08-06T12:00:00.000Z",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      },
    ]);
  });

  it("answer a supervise", async () => {
    test.project("e6d4744d-a11b-4c75-acad-e24a02903729");

    const { body } = await request(app)
      .post("/supervisings")
      .send({
        conversationId: "3b6625da-580e-4c4d-81da-f13476a62e67",
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      })
      .expect(201);

    const { body: supervising } = await request(app)
      .patch(`/supervisings/${body.id}`)
      .send({
        answer: "This is answer",
        status: "ANSWERED",
      })
      .expect(200);

    const { body: supervisings } = await request(app)
      .get("/colleagues/72ef5b08-b4a9-42b7-bb0a-22d40e56798b/supervisings")
      .expect(200);

    deepEqual(supervisings, [
      {
        id: "d92da3ee-521c-4b93-9770-c38dcea173a5",
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
        question: "What time do you close?",
        createdAt: "2023-08-06T12:00:00.000Z",
        answer: null,
        status: "IN_PROGRESS",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      },
      {
        id: supervising.id,
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        conversationId: "3b6625da-580e-4c4d-81da-f13476a62e67",
        question: "How do I make a great iced Americano ?",
        answer: "This is answer",
        createdAt: supervising.createdAt,
        status: "ANSWERED",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      },
    ]);
  });

  it("gets supervising with IN_PROGRESS status", async () => {
    test.project("e6d4744d-a11b-4c75-acad-e24a02903729");

    const { body } = await request(app)
      .get("/colleagues/72ef5b08-b4a9-42b7-bb0a-22d40e56798b/supervisings")
      .query({ status: "IN_PROGRESS" })
      .expect(200);

    deepEqual(body, [
      {
        id: "d92da3ee-521c-4b93-9770-c38dcea173a5",
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
        question: "What time do you close?",
        answer: null,
        createdAt: "2023-08-06T12:00:00.000Z",
        status: "IN_PROGRESS",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
      },
    ]);
  });

  it("get team supervisings", async () => {
    test.project("e6d4744d-a11b-4c75-acad-e24a02903729");

    const { body } = await request(app).get("/supervisings").expect(200);

    deepEqual(body, [
      {
        id: "d92da3ee-521c-4b93-9770-c38dcea173a5",
        sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
        conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
        question: "What time do you close?",
        answer: null,
        status: "IN_PROGRESS",
        colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
        createdAt: "2023-08-06T12:00:00.000Z",
      },
    ]);
  });

  it("get supervising by id", async () => {
    test.project("e6d4744d-a11b-4c75-acad-e24a02903729");

    const { body } = await request(app)
      .get("/supervisings/d92da3ee-521c-4b93-9770-c38dcea173a5")
      .expect(200);

    deepEqual(body, {
      id: "d92da3ee-521c-4b93-9770-c38dcea173a5",
      sessionId: "b605ad87-fe47-4dc8-b1cd-23d783c0a547",
      conversationId: "93dcd933-9bd8-45c0-b347-2dc12a0b2658",
      question: "What time do you close?",
      answer: null,
      status: "IN_PROGRESS",
      createdAt: "2023-08-06T12:00:00.000Z",
      colleagueId: "72ef5b08-b4a9-42b7-bb0a-22d40e56798b",
    });
  });
});
