import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import Navbar from '../layout/Navbar';
//import Footer from  '../layout/Footer';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        ¡Bienvenido!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/reservations')}>
                            Ver Reservas
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => navigate('/create-reservation')}>
                            Crear Reserva
                        </Button>
                    </Box>
                </Paper>
            </Container>
            {/* <Footer /> */}
        </>
    );
};

export default WelcomePage;