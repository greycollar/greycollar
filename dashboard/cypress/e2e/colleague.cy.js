import config from "../../config";
import templateConfig from "../../config.template";

describe("Colleague page", () => {
  beforeEach(() => {
    cy.fixture("colleagues-page/teams.json").then((teams) => {
      cy.wrap(teams[0].id).as("teamId");
      cy.platformSetup(
        teams[0].id,
        "colleagues-page/teams.json",
        config,
        templateConfig
      );
      cy.viewport(1280, 720);
    });

    cy.fixture("colleagues-page/colleagues.json").as("colleagues");

    cy.fixture("colleagues-page/colleague.json").as("colleague");

    cy.fixture("knowledges/knowledges.json").as("knowledges");

    cy.fixture("knowledges/delete/knowledges.get.json").as("knowledgesDelete");

    cy.fixture("knowledges/create/knowledges.post.json").as("knowledgesPost");

    cy.fixture("knowledges/create/knowledges.qa.post.json").as("knowledgesQA");

    cy.fixture("knowledges/create/knowledges.text.post.json").as(
      "knowledgesText"
    );

    cy.fixture("knowledges/create/knowledges.url.post.json").as(
      "knowledgesUrl"
    );

    cy.fixture("knowledges/delete/knowledges.qa.delete.json").as(
      "knowledgesQADelete"
    );

    cy.fixture("knowledges/delete/knowledges.text.delete.json").as(
      "knowledgesTextDelete"
    );

    cy.fixture("knowledges/delete/knowledges.url.delete.json").as(
      "knowledgesUrlDelete"
    );

    cy.fixture("knowledges/edit/knowledges.qa.json").as("knowledgesQAEdit");

    cy.fixture("knowledges/edit/knowledges.text.json").as("knowledgesTextEdit");

    cy.fixture("knowledges/edit/knowledges.edit.json").as("knowledgesEdit");

    cy.fixture("supervising/supervisings.json").as("supervising");

    cy.fixture("supervising/supervising.patch.json").as("supervisingPatch");

    cy.fixture("supervising/supervising.status.json").as("supervisingStatus");

    cy.fixture("supervising/supervising.status.answered.json").as(
      "supervisingStatusAnswered"
    );

    cy.fixture("supervising/supervising.patch.get.json").as(
      "supervisingPatchGet"
    );

    cy.intercept("GET", `/knowledge`, {
      fixture: "knowledges/knowledges.json",
    });
  });

  it("visit colleague page", function () {
    cy.visit("/colleagues");

    cy.setColleagueIntercept();

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.getBySel("colleague-card-more-vert").eq(0).first().click();

    cy.getBySel("colleague-card-menu-view").click();

    cy.checkRoute(`/colleagues/${this.colleague.id}`);
  });

  it("edit colleague page profile", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.getBySel("edit-icon").click();

    cy.getBySel("role").type("Developer");
    cy.getBySel("character").type("Funny");

    cy.intercept("PUT", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.getBySel("edit-icon").click();
    cy.getBySel("edit-icon").click();

    cy.getBySel("role").type("Customer Service Representative");
    cy.getBySel("character").type("Friendly, helpful, and a team player");

    cy.getBySel("edit-icon").click();

    cy.checkRoute(`/colleagues/${this.colleague.id}`);
  });

  it("add url in knowledge base", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.get('[data-cy="tab-knowledge-base"]').click();
    cy.get('[data-cy="tab-profile"]').click();
    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.waitEvent("KNOWLEDGE_LOADED");

    cy.getBySel("type-select").click();

    cy.getBySel("type-menu-URL").click();

    cy.getBySel("add-knowledge-button").click();

    cy.getBySel("add-item-select").click();

    cy.getBySel("add-type-menu-URL").click();

    cy.getBySel("finish").should("be.disabled");

    cy.getBySel("add-item-input").type("Hello");
    cy.get('input[name="inputValue"]').clear();

    cy.get("div.MuiFormHelperText-root.Mui-error")
      .should("be.visible")
      .and("contain", "URL cannot be an empty field");

    cy.getBySel("add-item-input").type("www.google.com");

    cy.intercept("POST", `/knowledge`, this.knowledgesUrl);
    cy.intercept("GET", `/knowledge`, this.knowledgesPost);

    cy.getBySel("finish").click();

    cy.waitEvent("KNOWLEDGE_CREATED");

    cy.checkRoute(`/colleagues/${this.colleague.id}`);

    cy.waitEvent("KNOWLEDGE_LOADED");
  });

  it("add text in knowledge base", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.get('[data-cy="tab-knowledge-base"]').click();
    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.waitEvent("KNOWLEDGE_LOADED");

    cy.getBySel("type-select").click();

    cy.getBySel("type-menu-TEXT").click();

    cy.getBySel("add-knowledge-button").click();

    cy.getBySel("add-item-select").click();

    cy.getBySel("add-type-menu-TEXT").click();

    cy.getBySel("finish").should("be.disabled");

    cy.getBySel("add-item-input").type("My first text");
    cy.get('input[name="inputValue"]').clear();

    cy.get("div.MuiFormHelperText-root.Mui-error")
      .should("be.visible")
      .and("contain", "TEXT cannot be an empty field");

    cy.getBySel("add-item-input").type("My first text");

    cy.intercept("POST", `/knowledge`, this.knowledgesText);
    cy.intercept("GET", `/knowledge`, this.knowledgesPost);

    cy.getBySel("finish").click();

    cy.waitEvent("KNOWLEDGE_CREATED");

    cy.checkRoute(`/colleagues/${this.colleague.id}`);

    cy.waitEvent("KNOWLEDGE_LOADED");
  });

  it("add qa in knowledge base", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.waitEvent("KNOWLEDGE_LOADED");

    cy.getBySel("type-select").click();

    cy.getBySel("type-menu-QA").click();

    cy.getBySel("add-knowledge-button").click();

    cy.getBySel("add-item-select").click();

    cy.getBySel("add-type-menu-QA").click();

    cy.getBySel("finish").should("be.disabled");

    cy.getBySel("add-item-question").type("How are you?");

    cy.getBySel("add-item-answer").type("Okay?");

    cy.get('input[name="question"]').clear();

    cy.get("div.MuiFormHelperText-root.Mui-error")
      .should("be.visible")
      .and("contain", "Question cannot be an empty field");

    cy.get('input[name="answer"]').clear();

    cy.get("div.MuiFormHelperText-root.Mui-error")
      .should("be.visible")
      .and("contain", "Answer cannot be an empty field");

    cy.getBySel("add-item-question").type("How are you?");
    cy.getBySel("add-item-answer").type("Okay?");

    cy.intercept("POST", `/knowledge`, this.knowledgesQA);
    cy.intercept("GET", `/knowledge`, this.knowledgesPost);

    cy.getBySel("finish").click();

    cy.waitEvent("KNOWLEDGE_CREATED");

    cy.checkRoute(`/colleagues/${this.colleague.id}`);

    cy.waitEvent("KNOWLEDGE_LOADED");
  });

  it("edit text in knowledge base", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.getBySel("type-select").click();

    cy.getBySel("type-menu-TEXT").click();

    cy.getBySel("knowledge-edit").eq(0).click();

    cy.getBySel("edit-button").click();

    cy.getBySel("edit-text").clear();
    cy.getBySel("edit-text").type("Changed text");

    cy.intercept(
      "PATCH",
      `/knowledge/${this.knowledgesTextEdit.id}`,
      this.knowledgesTextEdit
    );

    cy.intercept("GET", `/knowledge`, this.knowledgesEdit);

    cy.getBySel("edit-save").should("be.visible");

    cy.getBySel("edit-save").click();

    cy.waitEvent("KNOWLEDGE_UPDATED");

    cy.checkRoute(`/colleagues/${this.colleague.id}`);

    cy.waitEvent("KNOWLEDGE_LOADED");
  });

  it("edit qa in knowledge base", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.getBySel("type-select").click();

    cy.getBySel("type-menu-QA").click();

    cy.getBySel("knowledge-edit").eq(0).click();

    cy.getBySel("edit-button").click();

    cy.getBySel("edit-question").clear();
    cy.getBySel("edit-question").type("How are you today?");
    cy.getBySel("edit-answer").clear();
    cy.getBySel("edit-answer").type("Nice, thank you!");

    cy.intercept(
      "PATCH",
      `/knowledge/${this.knowledgesQAEdit.id}`,
      this.knowledgesQAEdit
    );

    cy.intercept("GET", `/knowledge`, this.knowledgesEdit);

    cy.getBySel("edit-save").should("be.visible");

    cy.getBySel("edit-save").click();

    cy.waitEvent("KNOWLEDGE_UPDATED");

    cy.checkRoute(`/colleagues/${this.colleague.id}`);

    cy.waitEvent("KNOWLEDGE_LOADED");
  });

  it("delete url in knowledge base", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.intercept("GET", `/knowledge`, this.knowledgesDelete);

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.getBySel("type-select").click();

    cy.getBySel("type-menu-URL").click();

    cy.getBySel("knowledge-edit").eq(1).click();

    cy.getBySel("delete-button").click();

    cy.intercept(
      "DELETE",
      `/knowledge/${this.knowledgesUrlDelete.id}`,
      this.knowledgesUrlDelete
    );

    cy.intercept("GET", `/knowledge`, this.knowledges);

    cy.getBySel("confirmation-delete").should("be.visible");

    cy.getBySel("confirmation-delete").click();

    cy.waitEvent("KNOWLEDGE_DELETED");

    cy.checkRoute(`/colleagues/${this.colleague.id}`);

    cy.waitEvent("KNOWLEDGE_LOADED");
  });

  it("delete text in knowledge base", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.intercept("GET", `/knowledge`, this.knowledgesDelete);

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.getBySel("type-select").click();

    cy.getBySel("type-menu-TEXT").click();

    cy.getBySel("knowledge-edit").eq(1).click();

    cy.getBySel("delete-button").click();

    cy.intercept(
      "DELETE",
      `/knowledge/${this.knowledgesTextDelete.id}`,
      this.knowledgesTextDelete
    );

    cy.intercept("GET", `/knowledge`, this.knowledges);

    cy.getBySel("confirmation-delete").should("be.visible");

    cy.getBySel("confirmation-delete").click();

    cy.waitEvent("KNOWLEDGE_DELETED");

    cy.checkRoute(`/colleagues/${this.colleague.id}`);

    cy.waitEvent("KNOWLEDGE_LOADED");
  });

  it("delete qa in knowledge base", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.intercept("GET", `/knowledge`, this.knowledgesDelete);

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-knowledge-base"]').click();

    cy.getBySel("type-select").click();

    cy.getBySel("type-menu-QA").click();

    cy.getBySel("knowledge-edit").eq(1).click();

    cy.getBySel("delete-button").click();

    cy.intercept(
      "DELETE",
      `/knowledge/${this.knowledgesQADelete.id}`,
      this.knowledgesQADelete
    );

    cy.intercept("GET", `/knowledge`, this.knowledges);

    cy.getBySel("confirmation-delete").should("be.visible");

    cy.getBySel("confirmation-delete").click();

    cy.waitEvent("KNOWLEDGE_DELETED");

    cy.checkRoute(`/colleagues/${this.colleague.id}`);

    cy.waitEvent("KNOWLEDGE_LOADED");
  });

  it("answers supervising", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept(
      "GET",
      `/colleagues/${this.colleague.id}/supervisings`,
      this.supervising
    );
    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.intercept(
      "GET",
      `/colleagues/${this.colleague.id}/supervisings?status=IN_PROGRESS`,
      this.supervisingStatus
    );

    cy.get('[data-cy="tab-supervising"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-supervising"]').click();

    cy.getBySel("type-select").should("exist");

    cy.getBySel("type-select").click("");

    cy.getBySel("type-menu-IN_PROGRESS").click();

    cy.getBySel("answer-supervise").should("exist");

    cy.getBySel("answer-supervise").eq(0).type("We are 7/24 coffee shop");

    cy.intercept(
      "PATCH",
      `/supervisings/${this.supervisingPatch.id}`,
      this.supervisingPatch
    );

    cy.intercept(
      "GET",
      `/colleagues/${this.colleague.id}/supervisings`,
      this.supervisingPatchGet
    );

    cy.getBySel("send-answer").eq(0).click();

    cy.getBySel("type-select").click("");

    cy.intercept(
      "GET",
      `/colleagues/${this.colleague.id}/supervisings?status=ANSWERED`,
      this.supervisingStatusAnswered
    );

    cy.getBySel("type-menu-ANSWERED").click();

    cy.getBySel("supervise-card").should("have.length", 1);

    cy.getBySel("supervise-card").should(
      "contain.text",
      "We are 7/24 coffee shop"
    );
  });

  it("goes task page", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.intercept("GET", `/tasks`, {
      fixture: "tasks/task.single.json",
    });

    cy.get('[data-cy="tab-task"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-task"]').click();
  });

  it("add task", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.intercept("GET", `/tasks`, {
      fixture: "tasks/task.single.json",
    });

    cy.get('[data-cy="tab-task"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-task"]').click();

    cy.getBySel("add-task-button").click();

    cy.getBySel("add-task-description").type(
      "Order napoli coffee bean from our provider"
    );

    cy.intercept("POST", `/tasks`, {
      fixture: "tasks/task.single.json",
    });

    cy.intercept("GET", `/tasks`, {
      fixture: "tasks/task.json",
    });

    cy.getBySel("finish").click();

    cy.getBySel("tasks-card")
      .eq(1)
      .should("contain.text", "Order napoli coffee bean from our provider");
  });

  it("shows task progresses", function () {
    cy.visit(`/colleagues/${this.colleague.id}`);

    cy.intercept("GET", `/colleagues/${this.colleague.id}`, this.colleague);

    cy.intercept("GET", `/tasks`, {
      fixture: "tasks/task.single.json",
    });

    cy.get('[data-cy="tab-task"]').click();

    cy.get('[data-cy="tab-profile"]').click();

    cy.get('[data-cy="tab-task"]').click();

    cy.intercept(
      "GET",
      `http://localhost:3000/tasks/8c88d077-99f1-482a-8575-879187b11ec9/progresses`,
      {
        fixture: "tasks/progress.json",
      }
    );

    cy.getBySel("progress-button").click();

    cy.getBySel("progress-card").should("be.visible");
  });
});
