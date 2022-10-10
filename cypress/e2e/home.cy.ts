describe("Load Home Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
  });
});

describe("Search", () => {
  it("Get search results", () => {
    cy.wait(2000);
    cy.get('input[placeholder="Search for cocktails"]').type("margarita");
    cy.wait(4000);
    cy.contains("Margarita");
  });
});

describe("Add items to favourite", () => {
  it("Get search results", () => {
    cy.wait(2000);
    cy.get(".add-favourite-img").eq(1).click();
    cy.get('input[placeholder="Search for cocktails"]').focus();
    cy.wait(1000);
    cy.get(".add-favourite-img").eq(2).click();
    cy.get('input[placeholder="Search for cocktails"]').focus();
    cy.wait(1000);
    cy.get(".add-favourite-img").eq(3).click();
  });
});

describe("Favourite cocktais", () => {
  it("Check favourite cocktails", () => {
    cy.wait(2000);
    cy.get(".favouriteIcon").click();
  });

  it("Remove favourite cocktails", () => {
    cy.wait(2000);
    cy.get(".deleteIcon").eq(0).click();
    cy.wait(2000);
    cy.get(".deleteIcon").eq(0).click();
    cy.wait(2000);
    cy.get(".deleteIcon").eq(0).click();
    cy.wait(2000);
    cy.get(".chakra-modal__close-btn").click();
  });
});

describe("Refres cocktais", () => {
  it("Get new 5 images", () => {
    cy.wait(2000);
    cy.get(".refreshIcon").click();
    cy.wait(4000);
  });
});
