import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '../../../../components';
import styled from 'styled-components';
import { ROLE } from '../../../../constans';
import {
	selectorUserRole,
	selectorUserLogin,
	selectorUserSession,
} from '../../../../selectors';
import { logout } from '../../../../actions';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const StyledIcon = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

const UserName = styled.div`
	font-size: 18px;
	fonw-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectorUserRole);
	const login = useSelector(selectorUserLogin);
	const session = useSelector(selectorUserSession);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<StyledIcon>
							<Icon
								id="fa-sign-out"
								margin="0 0 0 10px"
								onClick={() => dispatch(logout(session))}
							/>
						</StyledIcon>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<StyledIcon onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
				</StyledIcon>
				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 16px" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
