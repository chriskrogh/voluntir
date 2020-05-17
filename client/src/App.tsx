import React from 'react';
import UserContextProvider from 'context/user/provider';
import ThemeContextProvider from 'context/theme/provider';
import ThemeProvider from 'theme/themeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from 'components/pages/Main';
import Auth from 'components/pages/Auth';

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Route path='/' exact component={Main}></Route>
            <Route path='/auth' component={Auth}></Route>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;
