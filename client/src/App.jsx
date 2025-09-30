import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}

export default App;