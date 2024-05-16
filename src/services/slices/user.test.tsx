import { expect, test, describe } from '@jest/globals';
import user, {
  checkUserAuth,
  initialState,
  login,
  logout,
  register
} from './user';

describe('user extra reducers test', () => {
  const mockUserData = {
    name: 'test',
    email: 'test@test.ru'
  };

  const mockRegisterLoginData = {
    name: 'test',
    email: 'test@test.ru',
    password: 'test'
  };

  test('checkUserAuth.fulfilled', () => {
    const state = user(initialState, checkUserAuth.fulfilled(mockUserData, ''));
    expect(state.isAuthChecked);
    expect(state.data).toBe(mockUserData);
  });
  test('register.fulfilled', () => {
    const state = user(
      initialState,
      register.fulfilled(mockUserData, '', mockRegisterLoginData)
    );
    expect(state.isAuthChecked);
    expect(state.data).toBe(mockUserData);
  });
  test('login.fulfilled', () => {
    const state = user(
      initialState,
      login.fulfilled(mockUserData, '', mockRegisterLoginData)
    );
    expect(state.isAuthChecked);
    expect(state.data).toBe(mockUserData);
  });
  test('logout.fulfilled', () => {
    const state = user(initialState, logout.fulfilled(void 0, ''));
    expect(state.isAuthChecked);
    expect(state.data).toBe(null);
  });
  test('checkUserAuth.pending', () => {
    const state = user(initialState, checkUserAuth.pending(''));
    expect(state.isAuthChecked);
  });
  test('register.pending', () => {
    const state = user(
      initialState,
      register.pending('', mockRegisterLoginData)
    );
    expect(state.isAuthChecked);
  });
  test('login.pending', () => {
    const state = user(initialState, login.pending('', mockRegisterLoginData));
    expect(state.isAuthChecked);
  });
  test('logout.pending', () => {
    const state = user(initialState, logout.pending('', void 0));
    expect(state.isAuthChecked);
  });
  test('checkUserAuth.rejected', () => {
    const state = user(initialState, checkUserAuth.rejected(null, ''));
    expect(state.isAuthChecked);
  });
  test('register.rejected', () => {
    const state = user(
      initialState,
      register.rejected(null, '', mockRegisterLoginData)
    );
    expect(state.isAuthChecked);
  });
  test('login.rejected', () => {
    const state = user(
      initialState,
      login.rejected(null, '', mockRegisterLoginData)
    );
    expect(state.isAuthChecked);
  });
  test('logout.rejected', () => {
    const state = user(initialState, logout.rejected(null, '', void 0));
    expect(state.isAuthChecked);
  });
});
