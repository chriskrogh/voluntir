import React from 'react';
import UserContextProvider from 'context/user/provider';
import ThemeContextProvider from 'context/theme/provider';
import ThemeProvider from 'theme/themeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from 'components/pages/Main';
import Auth from 'components/pages/Auth';
import { Panels } from 'utils/constants';

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Route path='/auth' component={Auth}></Route>
            <Route path='/' exact render={() => <Main panel={Panels.HOME} />}></Route>
            <Route path='/explore' render={() => <Main panel={Panels.EXPLORE} />}></Route>
            <Route path='/event' render={() => <Main panel={Panels.EVENT} />}></Route>
            <Route path='/community' render={() => <Main panel={Panels.COMMUNITY} />}></Route>
            <Route path='/profile' render={() => <Main panel={Panels.PROFILE} />}></Route>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;
