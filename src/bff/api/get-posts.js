import { transformPost } from '../transformers';

export const getPosts = (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3005/posts?_page=${page}&_per_page=${limit}&title=${searchPhrase}`,
	)
		.then((loadedPosts) => loadedPosts.json())
		.then(({ data, ...links }) => ({
			posts: data && data.map(transformPost),
			links,
		}));
