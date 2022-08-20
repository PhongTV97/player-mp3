import { getErrors, clearErrors } from './error';
import { ACTION_TYPES } from '../types';

export const onLogin = (inforLogin) => async dispatch => {
    try {
        dispatch(clearErrors())
        await dispatch({
            type: ACTION_TYPES.LOGIN,
            inforLogin: inforLogin,
        });
    } catch (error) {
        console.log(error)
        dispatch(getErrors(error))
    }
}