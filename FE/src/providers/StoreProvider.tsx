import React from 'react';
import store from '../store/store';

import { Provider } from 'react-redux';

const StoreProvider = ({ children }: any) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default StoreProvider;
