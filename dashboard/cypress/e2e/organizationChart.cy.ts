import config from "../../config";

describe("Organization chart", () => {
  beforeEach(() => {
    cy.fixture("colleagues-page/teams.json").then((teams) => {
      cy.wrap(teams[0].id).as("teamId");
      cy.platformSetup(teams[0].id, "colleagues-page/team.json", config);
      cy.viewport(1280, 720);
    });
    cy.fixture("organizations/team.json").as("project");

    cy.intercept("GET", `/projects/e6d4744d-a11b-4c75-acad-e24a02903729`, {
      fixture: "organizations/team.json",
    });
  });
  it("navigates to chat page", function () {
    cy.visit("/");

    cy.intercept("GET", "/engines", {
      fixture: "colleagues-page/engines.json",
    });

    cy.intercept("GET", `/organizations/${this.project.organizationId}`, {
      fixture: "organizations/organization.json",
    });

    cy.getBySel("organization-button").click();

    cy.getBySel("organization-chart").should("be.visible");

    cy.getBySel("chat-link").should("be.visible");

    cy.setColleagueIntercept();

    cy.chatPageIntercept();

    cy.getBySel("chat-link").eq(0).click();
  });
});
