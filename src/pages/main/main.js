import { useEffect, useState } from 'react';
import { Pagination, PostCard } from './components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../constans';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [pageData, setPageData] = useState(1);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setPageData(links);
			},
		);
	}, [requestServer, page]);

	return (
		<>
			<div className={className}>
				{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						imageUrl={imageUrl}
						publishedAt={publishedAt}
						commentsCount={commentsCount}
					/>
				))}
			</div>
			{pageData.pages > 1 && (
				<Pagination page={page} pageData={pageData} setPage={setPage} />
			)}
		</>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
`;
