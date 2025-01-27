import MessageInput from "../../src/components/Chat/MessageInput/MessageInput";

describe("<MessageInput />", () => {
  beforeEach(() => {
    cy.mount(<MessageInput />);
  });

  it("clears the input when 'Enter' is pressed", () => {
    cy.get('[data-testid="message-input"]').type("Test message{enter}");
    cy.get('[data-testid="message-input"]')
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.be.empty;
      });
  });

  it("clears the input when the send button is clicked", () => {
    cy.get('[data-testid="message-input"]').type("Test message");
    cy.get('[data-testid="send-button"]').click();
    cy.get('[data-testid="message-input"]')
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.be.empty;
      });
  });

  it("renders dropdown menu when '/' is pressed", () => {
    cy.get('[data-testid="message-input"]').type("/");
    cy.get('[data-testid="command-dropdown"]').should("be.visible");
  });
});
