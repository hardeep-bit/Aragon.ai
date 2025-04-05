import React from 'react';
import './assets/styles/tailwind.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);