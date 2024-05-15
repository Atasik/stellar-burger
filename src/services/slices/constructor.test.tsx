import { expect, test, describe } from '@jest/globals';
import constructor, {
  initialState,
  addToConstructor,
  purgeIngredients,
  deleteFromConstructor,
  moveIngredientUp,
  moveIngredientDown
} from './constructor';

describe('constructor reducers test', () => {
  const mockNonBunIngredient = {
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

  const mockBunIngredient = {
    _id: 'testId',
    name: 'test',
    type: 'bun',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: 'testImage',
    image_large: 'testLarge',
    image_mobile: 'testMobile'
  };

  const ingredients = [
    {
      _id: 'testId1',
      id: '1',
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
    },
    {
      _id: 'testId2',
      id: '2',
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
    },
    {
      _id: 'testId3',
      id: '3',
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
    }
  ];

  test('purgeIngredients', () => {
    let state = constructor(
      initialState,
      addToConstructor(mockNonBunIngredient)
    );
    state = constructor(state, purgeIngredients());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toStrictEqual([]);
  });

  test('addToConstructor non-bun', () => {
    let state = constructor(
      initialState,
      addToConstructor(mockNonBunIngredient)
    );
    const { id, ...ingredientWithoutId } = state.ingredients[0];
    expect(ingredientWithoutId).toStrictEqual(mockNonBunIngredient);
    expect(state.bun).toBeNull();
  });

  test('addToConstructor bun', () => {
    let state = constructor(initialState, addToConstructor(mockBunIngredient));
    expect(state.bun).toBeTruthy();
  });

  test('deleteFromConstructor', () => {
    let state = constructor(
      initialState,
      addToConstructor(mockNonBunIngredient)
    );
    state = constructor(
      initialState,
      deleteFromConstructor(state.ingredients[0]._id)
    );
    expect(state.ingredients).toStrictEqual([]);
    expect(state.bun).toBeNull();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('moveIngredientDown', () => {
    let ingredientsState = {
      ...initialState,
      ingredients
    };
    ingredientsState = constructor(ingredientsState, moveIngredientUp(1));
    expect(ingredientsState.ingredients).toStrictEqual([
      ingredients[1],
      ingredients[0],
      ingredients[2]
    ]);
  });

  test('ingredientMoveUp', () => {
    let ingredientsState = {
      ...initialState,
      ingredients
    };
    ingredientsState = constructor(ingredientsState, moveIngredientDown(0));
    expect(ingredientsState.ingredients).toStrictEqual([
      ingredients[1],
      ingredients[0],
      ingredients[2]
    ]);
  });
});
