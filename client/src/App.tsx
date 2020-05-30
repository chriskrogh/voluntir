import React from 'react';
import UserContextProvider from 'context/user/provider';
import ThemeContextProvider from 'context/theme/provider';
import ThemeProvider from 'theme/themeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from 'components/pages/Main';
import Auth from 'components/pages/Auth';
import { Routes, Panels } from 'utils/constants';

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Route
              path={Routes.AUTH}
              component={Auth}>
            </Route>
            <Route
              path={Routes.HOME}
              exact
              render={() => <Main panel={Panels.HOME} />}>
            </Route>
            <Route
              path={Routes.EXPLORE}
              render={() => <Main panel={Panels.EXPLORE} />}>

            </Route>
            <Route
              path={Routes.EVENT}
              render={() => <Main panel={Panels.EVENT} />}>

            </Route>
            <Route
              path={Routes.COMMUNITY}
              render={() => <Main panel={Panels.COMMUNITY} />}>

            </Route>
            <Route
              path={Routes.PROFILE}
              render={() => <Main panel={Panels.PROFILE} />}>

            </Route>
            <Route
              path={Routes.SETTINGS}
              render={() => <Main panel={Panels.SETTINGS} />}>
            </Route>
            <Route
              path={Routes.MORE}
              render={() => <Main panel={Panels.MORE} />}>
            </Route>
            <Route
              path={Routes.CREATE_COMMUNITY}
              render={() => <Main panel={Panels.CREATE_COMMUNITY} />}>
            </Route>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;
