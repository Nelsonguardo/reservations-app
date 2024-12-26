import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getButtonStyle = (path) => {
        return location.pathname === path ? { backgroundColor: '#ffffff', color: '#000000' } : {};
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={() => navigate('/welcome')}>
                    <Typography variant="h6">
                        App de Reservas
                    </Typography>
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/welcome')}
                        sx={getButtonStyle('/welcome')}
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/reservations')}
                        sx={getButtonStyle('/reservations')}
                    >
                        Reservaciones
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/create-reservation')}
                        sx={getButtonStyle('/create-reservation')}
                    >
                        Crear Reserva
                    </Button>
                    {isLoggedIn && (
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;