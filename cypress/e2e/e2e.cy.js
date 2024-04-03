describe("e2e specs", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the first room calendar", () => {
    cy.url().should("include", "/rooms/1");
    cy.getDataTestId("select-room").should("have.value", 1);
  });

  describe("when the user clicks in the students link", () => {
    it("changes the page that the user is seeing to the first students page", () => {
      cy.getDataTestId("students").click();
      cy.url().should("include", "/students/10810");
      cy.getDataTestId("select-room").should("have.value", 10810);
    });
  });

  describe("when the user clicks in the inventory link", () => {
    it("changes the page that the user is seeing to the inventory page", () => {
      cy.getDataTestId("inventory").click();
      cy.url().should("include", "/inventory");
    });
  });

  describe("when the user is in another page and select the rooms page", () => {
    it("changes the page that the user is seeing to the first rooms page", () => {
      cy.getDataTestId("inventory").click();
      cy.url().should("include", "/inventory");
      cy.getDataTestId("rooms").click();
      cy.url().should("include", "/rooms/1");
      cy.getDataTestId("select-room").should("have.value", 1);
    });
  });
});
