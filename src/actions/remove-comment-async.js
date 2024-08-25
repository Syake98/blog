import { request } from '../utils/request';
import { removeComment } from './remove-comment';

export const removeCommentAsync = (postId, id) => (dispatch) => {
	request(`/posts/${postId}/comments/${id}`, 'DELET').then(() => {
		dispatch(removeComment(id));
	});
};
