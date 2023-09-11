import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Cart from './components/Cart';
import './style.css'

ReactDOM.render(
  <Provider store={store}>
        <div className="bg-white h-screen md:h-full sm:h-full">
        <header className='bg-black w-100'>
            <div className="text-center text-white text-3xl font-bold p-5 bg-teal-500 w-100">
              Shopping Store
            </div>
        </header>
        <Cart />
      </div>
    </Provider>,
  document.getElementById('root')
);
