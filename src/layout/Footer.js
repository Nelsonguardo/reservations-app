import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 4, textAlign: 'center' }}>
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} App de Reservas. Todos los derechos reservados.
            </Typography>
        </Box>
    );
};

export default Footer;