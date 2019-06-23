/**
 * This module contains the reducer that updates the store
 * in the result of the actions related to comments.
 *
 * @format
 * @flow
 */

import {
  CHANGE_COMMENT_INPUT_VISIBILITY,
  FETCH_PRODUCT_COMMENTS_FAIL,
  FETCH_PRODUCT_COMMENTS_SUCCESS,
  POST_COMMENT_SUCCESS,
  SET_COMMENTS_NOT_LOADED
} from "../actionCreators/types";

export default function commentReducer(state: Object, action: Object) {
  console.log("\n\n");
  console.log("====================== STATE in COMMENT_REDUCER");
  console.log(action.type);
  console.log(state);

  switch (action.type) {
    case CHANGE_COMMENT_INPUT_VISIBILITY:
      return {
        ...state,
        uiState: { ...state.uiState, isCommentInputVisible: action.isVisible }
      };

    case FETCH_PRODUCT_COMMENTS_FAIL:
      return {
        ...state,
        appState: {
          ...state.appState,
          isCommentsLoadedWithoutErrors: false,
          isCommentsLoadingFinished: true
        }
      };

    case FETCH_PRODUCT_COMMENTS_SUCCESS:
      return {
        ...state,
        appState: {
          ...state.appState,
          isCommentsLoadedWithoutErrors: true,
          isCommentsLoadingFinished: true,
          tempCommentId: -1
        },
        domainData: {
          ...state.domainData,
          comments: {
            ...state.domainData.comments,
            [`product_${action.id}`]: action.comments
          }
        }
      };

    case POST_COMMENT_SUCCESS:
      /*action.newComment.created_by = { username: state.domainData.username };
      action.newComment.id = state.appState.tempCommentId - 1;
      action.newComment.product = state.appState.selectedProduct;*/

      console.log(action.newComment);

      return {
        ...state,
        appState: {
          ...state.appState,
          tempCommentId: state.appState.tempCommentId - 1
        },
        domainData: {
          ...state.domainData,
          comments: {
            ...state.domainData.comments,
            [`product_${action.selectedProduct}`]: [
              action.newComment,
              ...state.domainData.comments[`product_${action.selectedProduct}`]
            ]
          }
        },
        uiState: { ...state.uiState, isCommentInputVisible: false }
      };

    case SET_COMMENTS_NOT_LOADED:
      return {
        ...state,
        appState: {
          ...state.appState,
          isCommentsLoadingFinished: false
        }
      };

    default:
      return state;
  }
}
