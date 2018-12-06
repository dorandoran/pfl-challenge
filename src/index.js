import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import Amplify from 'aws-amplify';

import config from './config';
import reducers from './reducers';
import App from './components/App';


// Setup for AWS Services
Amplify.configure({
    Storage: {
        region:config.s3.REGION,
        bucket: config.s3.BUCKET
    },
    API: {
        endpoints: [
            {
                name: 'pfl',
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            }
        ]
    }
})

// Persist libraries are used to keep data after reload
// Store is used for redux (global state container)
// Redux Thunk is used for asynchronous functions
const persistConfig = {
    key: 'root',
    storage, 
    whitelist: ['cart', 'customer', 'order']
}
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.querySelector('#root')
);