import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Modal, Box, Typography } from '@mui/material';
import ReservationForm from './ReservationForm';
import Navbar from '../layout/Navbar';
// import Footer from  '../layout/Footer';
import config from '../config/config';


const AvailableReservations = () => {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState(null);

    const fetchAvailableSpaces = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/reservations/available`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            if (data.status === 'success') {
                setSpaces(data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvailableSpaces();
    }, []);

    const openModal = (spaceId, scheduleId) => {
        setSelectedSpace({ space_id: spaceId, time_slot_id: scheduleId });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSpace(null);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <Navbar />
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Reservas Disponibles
                </Typography>
            </Box>
            <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre del Espacio</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Hora de Inicio</TableCell>
                                <TableCell>Hora de Fin</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Capacidad</TableCell>
                                <TableCell>Ubicación</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {spaces.map((space) => (
                                <TableRow key={`${space.space_id}-${space.schedule_id}`}>
                                    <TableCell>{space.name}</TableCell>
                                    <TableCell>{space.date}</TableCell>
                                    <TableCell>{space.start_time}</TableCell>
                                    <TableCell>{space.end_time}</TableCell>
                                    <TableCell>{space.description}</TableCell>
                                    <TableCell>{space.capacity}</TableCell>
                                    <TableCell>{space.location}</TableCell>
                                    <TableCell>{space.type}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => openModal(space.space_id, space.schedule_id)}>
                                            Reservar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Modal open={isModalOpen} onClose={closeModal}>
                <Box sx={{ ...modalStyle, ...modalContentStyle }}>
                    <Button onClick={closeModal}>Cerrar</Button>
                    <ReservationForm selectedSpace={selectedSpace} closeModal={closeModal} fetchAvailableSpaces={fetchAvailableSpaces} />
                </Box>
            </Modal>
            {/* <Footer /> */}
        </>
    );
};

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const modalContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export default AvailableReservations;