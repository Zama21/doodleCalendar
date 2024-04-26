import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store/index.js';

export const StoreProvider = (props) => {
    const { children } = props;
    return <Provider store={store}>{children}</Provider>;
};
