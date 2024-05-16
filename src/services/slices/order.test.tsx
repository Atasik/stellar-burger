import { expect, test, describe } from '@jest/globals';
import order, {
  clearOrderModalData,
  getOrderData,
  initialState,
  makeOrder,
  resetOrder
} from './order';

describe('order reducers test', () => {
  const mockState = {
    orderRequest: false,
    selectedIngredients: [
      {
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
      }
    ],
    orderModalData: {
      _id: 'testId',
      status: 'testStatus',
      name: 'test',
      createdAt: 'testCreatedDate',
      updatedAt: 'testUpdatedDate',
      number: 1,
      ingredients: ['test']
    }
  };

  test('resetOrder', () => {
    const state = order(mockState, resetOrder());
    expect(state.selectedIngredients).toStrictEqual([]);
  });

  test('clearOrderModalDate', () => {
    const state = order(mockState, clearOrderModalData());
    expect(state.orderModalData).toBe(null);
  });
});

describe('order extra reducers test', () => {
  const mockOrderData = {
    _id: 'testId',
    status: 'testStatus',
    name: 'test',
    createdAt: 'testCreatedDate',
    updatedAt: 'testUpdatedDate',
    number: 1,
    ingredients: ['test']
  };

  const mockOrderResponse = {
    order: mockOrderData,
    name: 'test'
  };

  test('getOrderData.fulfilled', () => {
    const state = order(
      initialState,
      getOrderData.fulfilled(mockOrderData, '', 1)
    );
    expect(state.orderModalData).toBe(mockOrderData);
  });
  test('makeOrder.rejected', () => {
    const state = order(initialState, makeOrder.rejected(null, '', ['testId']));
    expect(!state.orderRequest);
    expect(state.orderModalData).toBe(null);
  });
  test('makeOrder.pending', () => {
    const state = order(initialState, makeOrder.pending('', ['testId']));
    expect(state.orderRequest);
    expect(state.orderModalData).toBe(null);
  });
  test('makeOrder.fulfilled', () => {
    const state = order(
      initialState,
      makeOrder.fulfilled(mockOrderResponse, '', ['testId'])
    );
    expect(!state.orderRequest);
    expect(state.orderModalData).toBe(mockOrderData);
  });
});
