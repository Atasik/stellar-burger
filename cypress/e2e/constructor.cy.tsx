const testUrl = 'http://localhost:4000';
const bun = `[data-cy ='643d69a5c3f7b9001cfa093d']`;
const apiUrl = 'https://norma.nomoreparties.space/api';

describe('E2E Test', () => {
  beforeEach(() => {
    cy.intercept('GET', `${apiUrl}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', `${apiUrl}/auth/user`, { fixture: 'auth.json' }).as(
      'getUser'
    );
    cy.intercept('POST', `${apiUrl}/orders`, { fixture: 'order.json' }).as(
      'getOrders'
    );
    cy.visit(testUrl);
    cy.setCookie('accessToken', 'test1');
    localStorage.setItem('refreshToken', 'test2');
    cy.visit('/');
    cy.contains('Соберите бургер');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  describe('Check requests replace', function () {
    it('Ingredients', () => {
      expect('@getIngredients');
    });
    it('UserData', () => {
      expect('@getUser');
    });
    it('OrderData', () => {
      expect('@getOrders');
    });
  });

  describe('Check add ingredients to constructor', function () {
    const ingredients = [
      bun,
      `[data-cy ='643d69a5c3f7b9001cfa0943']`,
      `[data-cy ='643d69a5c3f7b9001cfa093e']`
    ];

    it('Add ingredients', () => {
      ingredients.forEach((elem) => {
        cy.get(elem).children('button').click();
      });
    });
  });

  describe('Test order', function () {
    const ingredients = [
      `[data-cy ='643d69a5c3f7b9001cfa0943']`,
      `[data-cy ='643d69a5c3f7b9001cfa093c']`,
      `[data-cy ='643d69a5c3f7b9001cfa093f']`
    ];
    it('Make order', () => {
      ingredients.forEach((elem) => {
        cy.get(elem).children('button').click();
      });
      cy.contains('Оформить заказ').click();
      cy.get(`[data-cy ='orderNumber']`).should('have.text', '39393');
      cy.get(`[data-cy ='modal-overlay']`).click({ force: true });
      cy.get(`[data-cy ='modal']`).should('not.exist');
      cy.get('[data-cy=constructor]')
        .find('[data-cy=constructorList]')
        .find('[data-cy=emptyConstructor]');
    });
  });

  describe('Check modals', function () {
    it('Open ingredient modal', () => {
      cy.get(bun).click();
      cy.get(`[data-cy ='modal']`).should('exist');
    });
    it('Open modal ingredient data', () => {
      cy.get(bun).click();
      cy.get(`[data-cy ='modal']`).should('exist');
      cy.get('[data-cy="image_large"]').should('be.visible');
      cy.get(`[data-cy ='fat']`).should('have.text', '26');
      cy.get(`[data-cy ='carbohydrates']`).should('have.text', '85');
      cy.get(`[data-cy ='calories']`).should('have.text', '643');
      cy.get(`[data-cy ='proteins']`).should('have.text', '44');
      cy.get(`[data-cy ='name']`).should(
        'have.text',
        'Флюоресцентная булка R2-D3'
      );
    });
    it('Close modal', () => {
      cy.get(bun).click();
      cy.get('[data-cy=modal]').should('exist');
      cy.get(`[data-cy ='closeModal']`).click();
      cy.get(`[data-cy ='modal']`).should('not.exist');
    });
    it('Close modal overlay', () => {
      cy.get(bun).click();
      cy.get('[data-cy=modal]').should('exist');
      cy.get(`[data-cy ='modal-overlay']`).click({ force: true });
      cy.get(`[data-cy ='modal']`).should('not.exist');
    });
  });
});
