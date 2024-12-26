import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../layout/Navbar';
//import Footer from '../layout/Footer';
import config from '../config/config';

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${config.apiUrl}/reservations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setReservations(data.data);
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleCancel = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const request = await fetch(`${config.apiUrl}/reservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await request.json();

            if (data.status === "success") {
                setReservations((prev) => prev.filter((res) => res.id !== id));
            }
        } catch (error) {
            console.error("Error cancelling reservation:", error);
        }
    };

    const handleOpenDialog = (id) => {
        setSelectedReservationId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReservationId(null);
    };

    const handleConfirmCancel = () => {
        handleCancel(selectedReservationId);
        handleCloseDialog();
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        Reservas
                    </Typography>
                    {reservations.length === 0 ? (
                        <Typography variant="body1" color="textSecondary">
                            No hay reservas disponibles.
                        </Typography>
                    ) : (
                        <List>
                            {reservations.map((res) => (
                                <ListItem key={res.id} sx={{ marginBottom: 2 }}>
                                    <ListItemText
                                        primary={`Nombre del Espacio: ${res.space_name}`}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="textPrimary">
                                                    Fecha: {res.date}
                                                </Typography>
                                                <br />
                                                Hora de Inicio: {res.start_time}
                                                <br />
                                                Hora de Fin: {res.end_time}
                                                <br />
                                                Descripción: {res.description}
                                                <br />
                                                Ubicación: {res.location}
                                                <br />
                                                Reservado por: {res.user_name} {res.user_last_name}
                                            </>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDialog(res.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Paper>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirmar Cancelación"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Está seguro de que desea cancelar esta reserva?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmCancel} color="primary" autoFocus>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
            {/* <Footer /> */}
        </>
    );
};

export default ReservationsPage;