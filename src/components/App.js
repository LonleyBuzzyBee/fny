import React from 'react';
import Routes from './Routes';
import { BrowserRouter as Router} from "react-router-dom";
import AuthProvider from './Routes/Auth'
import Chat from './ReusableComponents/Chat';
import '../Scss/main.scss';

const App = () => {

  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL ? process.env.PUBLIC_URL.replace(/\/$/, '') : ''}>
        <Routes />
        <Chat />
      </Router>
    </AuthProvider>
  );
}

export default App;
