import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import config from '../config/config';

const ReservationForm = ({ selectedSpace, closeModal, fetchAvailableSpaces }) => {
    const [formData, setFormData] = useState({
        space_id: selectedSpace?.space_id || '',
        time_slot_id: selectedSpace?.time_slot_id || '',
        user_name: '',
        user_last_name: '',
        user_email: '',
        number_phone: '',
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        if (selectedSpace) {
            setFormData({
                ...formData,
                space_id: selectedSpace.space_id,
                time_slot_id: selectedSpace.time_slot_id,
            });
        }
    }, [selectedSpace]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${config.apiUrl}/reservations` , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                setSnackbar({ open: true, message: '¡Reserva creada!', severity: 'success' });
                setFormData({
                    space_id: '',
                    time_slot_id: '',
                    user_name: '',
                    user_last_name: '',
                    user_email: '',
                    number_phone: '',
                });
                setTimeout(() => {
                    closeModal(); // Cerrar el modal después de la creación
                    fetchAvailableSpaces(); // Recargar los datos de reservas disponibles
                }, 1000);
            } else {
                const errorData = await response.json();
                setSnackbar({ open: true, message: `Error al crear la reserva: ${errorData.message}`, severity: 'error' });
            }
        } catch (error) {
            console.error('Error creating reservation:', error);
            setSnackbar({ open: true, message: 'Error al crear la reserva. Por favor, inténtelo de nuevo.', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                name="user_name"
                label="Nombre"
                value={formData.user_name}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="user_last_name"
                label="Apellido"
                value={formData.user_last_name}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="user_email"
                label="Correo Electrónico"
                value={formData.user_email}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="number_phone"
                label="Número de Teléfono"
                value={formData.number_phone}
                onChange={handleChange}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Crear
            </Button>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ReservationForm;