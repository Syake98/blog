import PropTypes from 'prop-types';
import { Button } from '../../../../components';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, pageData, setPage }) => {
	const { first, last, next, prev } = pageData;

	return (
		<div className={className}>
			<Button disabled={page === first} onClick={() => setPage(first)}>
				В начало
			</Button>
			<Button disabled={page === first} onClick={() => setPage(prev)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button disabled={page === last} onClick={() => setPage(next)}>
				Следующая
			</Button>
			<Button disabled={page === last} onClick={() => setPage(last)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	flex: 1 0 0;
	margin: 0 0 20px;
	padding: 0 35px;

	& button {
		margin: 0 5px;
		width: fit-content;
		padding-inline: 16px;
	}

	& .current-page {
		width: fit-content;
		padding-inline: 16px;
		height: 32px;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
		border: 1px solid #000;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	pageData: PropTypes.object.isRequired,
	setPage: PropTypes.func.isRequired,
};
