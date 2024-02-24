import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import ThemeProvider from './configs/ThemeProvider.jsx'
import Navigation from './Navigation/Navigation.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss'
import './index.css'
import store from './store/store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        {/* <Navigation /> */}
        <h1>lklklk</h1>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
