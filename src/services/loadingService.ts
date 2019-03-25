import { dispatch, getState } from '../stores/store';
import {
  showLoading as showLoadingAction,
  hideLoading as hideLoadingAction,
} from '../stores/loadingOverlaySlice';

export function showLoading() {
  if (getState().loadingOverlay.isLoading) {
    return;
  }

  dispatch(showLoadingAction());
}

export function hideLoading() {
  if (!getState().loadingOverlay.isLoading) {
    return;
  }

  dispatch(hideLoadingAction());
}

export default { showLoading, hideLoading };
