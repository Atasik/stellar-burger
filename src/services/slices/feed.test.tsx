import { expect, test, describe } from '@jest/globals';
import feed, { fetchFeeds, fetchUserOrders, initialState } from './feed';
import { TOrder } from '@utils-types';

describe('ingredients extra reducers test', () => {
  const mockOrderData: TOrder = {
    _id: 'testId',
    status: 'testStatus',
    name: 'test',
    createdAt: 'testCreatedDate',
    updatedAt: 'testUpdatedDate',
    number: 1,
    ingredients: ['test']
  };

  const mockEmptyResponse = {
    orders: [],
    total: 0,
    totalToday: 0
  };

  const mockFeedResponse = {
    success: true,
    orders: [
      {
        _id: 'testId',
        status: 'testStatus',
        name: 'test',
        createdAt: 'testCreatedDate',
        updatedAt: 'testUpdatedDate',
        number: 1,
        ingredients: ['test']
      }
    ],
    total: 1,
    totalToday: 1
  };

  test('fetchFeeds.pending', () => {
    const state = feed(initialState, fetchFeeds.pending(''));
    expect(state.isLoading);
    expect(state.response).toStrictEqual(mockEmptyResponse);
  });
  test('fetchFeeds.fulfilled', () => {
    const state = feed(
      initialState,
      fetchFeeds.fulfilled(mockFeedResponse, '')
    );
    expect(!state.isLoading);
    expect(state.orders).toStrictEqual([mockOrderData]);
    expect(state.response).toStrictEqual(mockFeedResponse);
  });
  test('fetchFeeds.rejected', () => {
    const state = feed(initialState, fetchFeeds.rejected(null, ''));
    expect(!state.isLoading);
    expect(state.response).toStrictEqual(mockEmptyResponse);
  });
  test('fetchUserOrders.pending', () => {
    const state = feed(initialState, fetchUserOrders.pending(''));
    expect(state.isLoading);
    expect(state.response).toStrictEqual(mockEmptyResponse);
  });
  test('fetchUserOrders.fulfilled', () => {
    const state = feed(
      initialState,
      fetchUserOrders.fulfilled([mockOrderData], '')
    );
    expect(!state.isLoading);
    expect(state.orders).toStrictEqual([mockOrderData]);
    expect(state.response).toStrictEqual(mockEmptyResponse);
  });
  test('fetchUserOrders.rejected', () => {
    const state = feed(initialState, fetchUserOrders.rejected(null, ''));
    expect(!state.isLoading);
    expect(state.response).toStrictEqual(mockEmptyResponse);
  });
});
