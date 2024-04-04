describe("students specs", () => {
  beforeEach(() => {
    cy.visit("/students");
  });

  it("shows the first student calendar", () => {
    cy.url().should("include", "/students/10810");
    cy.getDataTestId("select-room").should("have.value", 10810);
  });

  describe("when changing the select student", () => {
    it("changes the URL and shows another student calendar", () => {
      cy.getDataTestId("calendar-data")
        .invoke("attr", "data-value")
        .then((dataValue) => {
          cy.getDataTestId("select-room").select("34648");
          cy.url().should("include", "/students/34648");
          cy.getDataTestId("select-room").should("have.value", 34648);

          cy.getDataTestId("calendar-data")
            .invoke("attr", "data-value")
            .should("not.eq", dataValue);
        });
    });
  });

  describe("when going to a student URL that not exists", () => {
    it("returns to the first student", () => {
      cy.visit("/students/nonExistentStudent");
      cy.url().should("include", "/students/10810");
      cy.getDataTestId("select-room").should("have.value", 10810);
    });
  });
});
