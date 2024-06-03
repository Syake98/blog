import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../constans';
import { debounce } from './utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [pageData, setPageData] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setPageData(links);
			},
		);
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length ? (
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
			) : (
				<div className="no-posts-found">Статьи не найдены</div>
			)}
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

	& .no-post-found {
		font-style: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
