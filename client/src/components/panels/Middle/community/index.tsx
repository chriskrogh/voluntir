import React from 'react';
import /*type*/ { History } from 'history';
import { useHistory } from 'react-router-dom';
import communities from 'data/communities';
import M from 'utils/errorMessages';
import useQuery from 'utils/hooks/useQuery';
import { Routes } from 'utils/constants';
import Content from './content';

const getCommnity = (id: string | null, history: History) => {
  if (id == null) {
    console.error(M.COMMUNITY_PAGE_ID);
    history.push(Routes.HOME)
    return communities[0];
  } else {
    // replace with api call
    return communities[parseInt(id)];
  }
}

function CommunityPanel() {
  const history = useHistory();
  const id = useQuery().get('id');
  const community = getCommnity(id, history);

  return (
    <Content community={community} />
  );
}

export default CommunityPanel;
