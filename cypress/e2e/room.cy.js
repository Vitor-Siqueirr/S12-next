describe("rooms specs", () => {
  beforeEach(() => {
    cy.visit("/rooms");
  });

  it("shows the first room calendar", () => {
    cy.url().should("include", "/rooms/1");
    cy.getDataTestId("select-room").should("have.value", 1);
  });

  describe("when changing the select room", () => {
    it("changes the URL and shows another room calendar", () => {
      cy.getDataTestId("calendar-data")
        .invoke("attr", "data-value")
        .then((dataValue) => {
          cy.getDataTestId("select-room").select(3);
          cy.url().should("include", "/rooms/2");
          cy.getDataTestId("select-room").should("have.value", 2);

          cy.getDataTestId("calendar-data")
            .invoke("attr", "data-value")
            .should("not.eq", dataValue);
        });
    });
  });

  describe("when going to a room URL that not exists", () => {
    it("returns to the first room", () => {
      cy.visit("/rooms/nonExistentRoom");
      cy.url().should("include", "/rooms/1");
      cy.getDataTestId("select-room").should("have.value", 1);
    });
  });
});
