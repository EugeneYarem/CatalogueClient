/**
 * This module contains middleware that executes all functions related to the comments.
 *
 * @format
 * @flow
 */

import ServerApiService from "../services/ServerApiService";
import {
  fetchProductCommentsFail,
  fetchProductCommentsSuccess,
  postCommentFail,
  postCommentSuccess,
  setCommentsLoadedToFalse
} from "../actionCreators/CommentActions";
import showErrorMessage from "./showErrorMessage";

const FETCH_COMMENTS_FAIL_MESSAGE =
  "Something has gone wrong. We can't get a list of product comments.";
const POST_COMMENT_FAIL_MESSAGE =
  "Something has gone wrong. We can't post your comment.";
const apiClient = ServerApiService.getApiService();

export function fetchProductComments(id: number) {
  return (dispatch: Function) => {
    dispatch(setCommentsLoadedToFalse());
    return apiClient
      .get(`reviews/${id}`)
      .then(response => {
        console.log("fetchProductComments");
        console.log(response.data);
        dispatch(fetchProductCommentsSuccess(id, response.data));
      })
      .catch(error => {
        console.log("fetchProductComments: " + error);
        showErrorMessage(FETCH_COMMENTS_FAIL_MESSAGE);
        dispatch(fetchProductCommentsFail());
        //throw error;
      });
  };
}

export function postComment(
  comment: string,
  productId: number,
  rating: number
) {
  return (dispatch: Function) => {
    return apiClient
      .post(`reviews/${productId}`, { rate: rating, text: comment })
      .then(response => {
        console.log("postComment");

        if (response.data.success === true) {
          const newComment = {
            created_at: new Date().toString(),
            created_by: {},
            rate: rating,
            text: comment
          };
          dispatch(postCommentSuccess(newComment));
        } else {
          showErrorMessage(POST_COMMENT_FAIL_MESSAGE);
          dispatch(postCommentFail());
        }
      })
      .catch(error => {
        console.log("postComment: " + error);
        showErrorMessage(POST_COMMENT_FAIL_MESSAGE);
        dispatch(postCommentFail());
        //throw error;
      });
  };
}