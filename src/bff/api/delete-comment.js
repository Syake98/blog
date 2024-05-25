export const deleteComment = async (comment) =>
	fetch(`http://localhost:3005/comments/${comment}`, {
		method: 'DELETE',
	});
