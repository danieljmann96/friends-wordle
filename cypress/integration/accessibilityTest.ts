import 'cypress-axe';

describe('Accessibility testing', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.injectAxe();
  });
  it('has no a11y violations', () => {
    cy.checkA11y();
  });
});
