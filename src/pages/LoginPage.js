import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import config from '../config/config';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                localStorage.setItem('token', data.token); // Guardar token
                navigate('/welcome'); // Redirigir
            } else {
                setError('Error al iniciar sesión, verifique sus credenciales.');
            }
        } catch (err) {
            setError('Error al iniciar sesión, verifique sus credenciales.');
        }
    };

    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        Iniciar Sesión
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            type="email"
                            label="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            type="password"
                            label="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Iniciar Sesión
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default LoginPage;