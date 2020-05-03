import React from 'react';
import UserContextProvider from 'context/user/provider';
import ThemeContextProvider from 'context/theme/provider';
import ThemeProvider from 'theme/themeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from 'components/pages/Home';
import Auth from 'components/pages/Auth';

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Route path='/' exact component={Home}></Route>
            <Route path='/auth' component={Auth}></Route>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;
