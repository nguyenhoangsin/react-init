import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { Storetate } from './store';

type LoadingOverlay = {
  isLoading: boolean;
};

const initialState: LoadingOverlay = {
  isLoading: false,
};

const loadingOverlaySlice = createSlice({
  name: 'loadingOverlay',
  initialState,
  reducers: {
    showLoading: (state: LoadingOverlay) => ({
      ...state,
      isLoading: true,
    }),
    hideLoading: (state: LoadingOverlay) => ({
      ...state,
      isLoading: false,
    }),
    showHideLoading: (
      state: LoadingOverlay,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
});

export const { showLoading, hideLoading, showHideLoading } =
  loadingOverlaySlice.actions;
export const loadingOverlayReducer = loadingOverlaySlice.reducer;

// SELECTOR
export const isLoadingSelector = (state: Storetate) =>
  state.loadingOverlay.isLoading;
export const isLoadingOverlayReselector = createSelector(
  [isLoadingSelector],
  (isLoading) => isLoading,
);
