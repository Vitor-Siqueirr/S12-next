describe("inventory specs", () => {
  beforeEach(() => {
    cy.visit("/inventory");
  });

  it("renders InventoryItem with data", () => {
    cy.getDataTestId("inventory-list").should("have.length.greaterThan", 1);

    cy.getDataTestId("inventory-list").each(($item) => {
      cy.wrap($item).find("[data-testid=item-title]").should("not.be.empty");
      cy.wrap($item).find("[data-testid=item-sector]").should("not.be.empty");
      cy.wrap($item)
        .find("[data-testid=item-fragility]")
        .should("not.be.empty");
      cy.wrap($item)
        .find("[data-testid=item-last-maintenance]")
        .should("not.be.empty");
      cy.wrap($item).find("[data-testid=item-wear]").should("not.be.empty");
    });
  });
});
