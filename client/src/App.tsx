import React from 'react';
import UserContextProvider from 'context/user/provider';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import LightTheme from 'theme/light';
import DarkTheme from 'theme/dark';
import Header from 'components/Header';
import Home from 'components/pages/Home';
import Auth from 'components/pages/Auth';

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={LightTheme}>
        <BrowserRouter>
          <Header />
          <Route path='/' exact component={Home}></Route>
          <Route path='/auth' component={Auth}></Route>
        </BrowserRouter>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
