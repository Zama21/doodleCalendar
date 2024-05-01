import { useSelector } from 'react-redux';

export const useUserData = () => {
    return useSelector(state => state.auth.userData);
};
