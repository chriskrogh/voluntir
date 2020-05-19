import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from 'utils/constants';

function Home() {
    const history = useHistory();

    useEffect(() => {
        history.push(Routes.HOME);
        // eslint-disable-next-line
    }, []);

    return <div />;
}

export default Home;