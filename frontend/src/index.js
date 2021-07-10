import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store';


//Create components using react.Lazy
const LightTheme = lazy(()=> import('./themes/lightTheme'))
const DarkTheme = lazy(()=> import('./themes/darkTheme'))


const ThemeSelector = ({ children }) => {
  return(
     <>
      <Suspense fallback={<></>}>
        
        <DarkTheme/>
    </Suspense>
     {children}
     </>
   )
 }

ReactDOM.render(
  <ThemeSelector>
  <Provider store={store}>
    <App />
  </Provider>
  </ThemeSelector>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
