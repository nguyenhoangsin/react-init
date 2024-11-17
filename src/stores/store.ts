import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { loadingOverlayReducer } from './loadingOverlaySlice';

const rootReducer = combineReducers({
  loadingOverlay: loadingOverlayReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type Storetate = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export const useStoreDispatch: () => StoreDispatch = useDispatch;
export const useStoreSelector: TypedUseSelectorHook<Storetate> = useSelector;
export const getState = store.getState;
export const dispatch = store.dispatch;

export default store;
