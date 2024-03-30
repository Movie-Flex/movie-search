import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContextProvider from './context/UserContext';
import { ChakraProvider } from '@chakra-ui/react'
import CancelContextProvider from './context/CancelContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ChakraProvider>
      <CancelContextProvider>

      <App />
      </CancelContextProvider>
    </ChakraProvider>
  </UserContextProvider>
);

