import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react';

import {Provider} from 'react-redux'
import  {BrowserRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import store from './Redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
    <Toaster/>
  </BrowserRouter>
  </Provider>,
)
