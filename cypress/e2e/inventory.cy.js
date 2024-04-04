describe("inventory specs", () => {
  beforeEach(() => {
    cy.visit("/inventory");
  });

  it("renders the inventory itens with useful data", () => {
    cy.getDataTestId("inventory-list").should("have.length.greaterThan", 1);

    cy.getDataTestId("inventory-list").then(($list) => {
      const items = [...$list].slice(0, 10);

      items.forEach(($item) => {
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
});
