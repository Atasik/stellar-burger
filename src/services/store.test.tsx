import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';

describe('root reducer test', () => {
  test('root reducer', () => {
    const reducer = rootReducer(undefined, { type: 'SOME_ACTION' });

    let properties = [
      'constructorItems',
      'user',
      'order',
      'feed',
      'ingredients'
    ];

    properties.forEach((elem) => {
      expect(reducer).toHaveProperty(elem);
    });
  });
});
