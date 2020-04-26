import React from 'react';
import UserContextProvider from 'context/user/provider';
import FB from 'components/FB';

function App() {
  return (
    <UserContextProvider>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FB />
      </div>
    </UserContextProvider>
  );
}

export default App;
