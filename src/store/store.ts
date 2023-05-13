import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import cvReducer from '../features/cv/cvSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    cv: cvReducer,
    chat: chatReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type ArrayElementType<T> = T extends (infer E)[] ? E : never;
