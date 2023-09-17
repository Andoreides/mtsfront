import React, { useState, useEffect } from 'react';
import TariffTable from './TariffTable';
import UpdateDataButton from './UpdateDataButton';
import './App.css';

const App = () => {
    const [dataUpdated, setDataUpdated] = useState(false);

    const handleUpdate = () => {
        setDataUpdated(true);
    };

    useEffect(() => {
        if (dataUpdated) {
            window.location.reload();
        }
    }, [dataUpdated]);

    return (
        <div className={'App'}>
            <h1 className={'app__title'}>Тарифы МТС</h1>
            <UpdateDataButton onUpdate={handleUpdate} />
            <TariffTable />
        </div>
    );
};

export default App;