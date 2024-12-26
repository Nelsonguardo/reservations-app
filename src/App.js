import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import ReservationsPage from './pages/ReservationsPage';
import AvailableReservations from './components/AvailableReservations';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/create-reservation" element={<AvailableReservations />} />
            </Routes>
        </Router>
    );
};

export default App;
