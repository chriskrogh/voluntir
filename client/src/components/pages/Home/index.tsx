import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from 'utils/constants';

function Home() {
    const history = useHistory();

    useEffect(() => {
        history.push(Routes.MAIN);
    }, []);

    return <div />;
}

export default Home;