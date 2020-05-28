import React from 'react';
import Panel from './common/panel';
import Container from './common/container';
import Title from 'components/typography/Title';

function Settings() {
  return (
    <Panel>
      <Container>
        <div>
          <Title text="Settings" />
        </div>
      </Container>
    </Panel>
  );
}

export default Settings;