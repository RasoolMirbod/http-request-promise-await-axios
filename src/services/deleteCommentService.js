// import http from "./httpService";
import instance from "../axiosInstance";

export function deleteComment(commentId) {
  return instance.delete(`/comments/${commentId}`);
}
