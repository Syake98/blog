import { ACTION_TYPE } from '../actions/action-type';
import { ROLE } from '../constans';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	registedAt: null, // строки не было, возможно тут ошибка
	session: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
