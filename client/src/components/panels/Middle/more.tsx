import React from 'react';
import Panel from './common/panel';
import Container from './common/container';
import Title from 'components/typography/Title';

function More() {
  return (
    <Panel>
      <Container>
        <div>
          <Title text="More" />
        </div>
      </Container>
    </Panel>
  );
}

export default More;