/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      addToken(accessToken: string, refreshToken: string): void;
      purgeToken(): void;
      checkInredient(
        fat: string,
        carbohydrates: string,
        calories: string,
        proteins: string,
        name: string
      ): void;
    }
  }
}

export function addToken(accessToken: string, refreshToken: string) {
  cy.setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function purgeToken() {
  cy.clearCookie('accessToken');
  cy.clearLocalStorage('refreshToken');
}

export function checkInredient(
  fat: string,
  carbohydrates: string,
  calories: string,
  proteins: string,
  name: string
) {
  cy.get('[data-cy="image_large"]').should('be.visible');
  cy.get(`[data-cy ='fat']`).should('have.text', fat);
  cy.get(`[data-cy ='carbohydrates']`).should('have.text', carbohydrates);
  cy.get(`[data-cy ='calories']`).should('have.text', calories);
  cy.get(`[data-cy ='proteins']`).should('have.text', proteins);
  cy.get(`[data-cy ='name']`).should('have.text', name);
}

Cypress.Commands.add('addToken', addToken);
Cypress.Commands.add('purgeToken', purgeToken);
Cypress.Commands.add('checkInredient', checkInredient);
