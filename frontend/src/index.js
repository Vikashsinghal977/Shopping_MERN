import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import store from "./store"
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplete from "react-alert-template-basic"; 

const option = {
  timeout:5000,
  position: positions.BOTTOM_CENTER,
  transition:transitions.SCALE,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplete} {...option}>
      <App />
    </AlertProvider>
  </Provider>
);
