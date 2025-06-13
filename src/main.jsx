import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Your App component
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Redux Provider
// import store from './src/themeRedux.jsx'; // Import Redux store
import './firebase.js'; // Firebase config

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* Then wrap with Redux Provider for Global Store */}
      {/* <Provider store={store}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </Provider> */}
  </React.StrictMode>
);
