import { expect, test, describe } from '@jest/globals';
import ingredients, { fetchIngredients, initialState } from './ingredients';

describe('ingredients extra reducers test', () => {
  const mockIngredient = {
    _id: 'testId',
    name: 'test',
    type: 'testType',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: 'testImage',
    image_large: 'testLarge',
    image_mobile: 'testMobile'
  };

  const mockIngredientResult = {
    _id: 'testId',
    name: 'test',
    type: 'testType',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: 'testImage',
    image_large: 'testLarge',
    image_mobile: 'testMobile'
  };

  test('fetchIngredients.pending', () => {
    const state = ingredients(initialState, fetchIngredients.pending(''));
    expect(state.loading);
    expect(state.ingredients).toStrictEqual([]);
  });
  test('fetchIngredients.rejected', () => {
    const state = ingredients(
      initialState,
      fetchIngredients.rejected(null, '')
    );
    expect(!state.loading);
    expect(state.ingredients).toStrictEqual([]);
  });
  test('fetchIngredients.fulfilled', () => {
    const state = ingredients(
      initialState,
      fetchIngredients.fulfilled([mockIngredient], '')
    );
    expect(!state.loading);
    expect(state.ingredients).toStrictEqual([mockIngredient]);
  });
});
