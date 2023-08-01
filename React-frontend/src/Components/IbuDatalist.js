import React, { useEffect, useState } from 'react';
import axios from '../api';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IbuForm from './IbuForm';
import EditIbuModal from './EditIbuModal'; // Import the EditIbuModal component
import './IbuDataList.css'

const IbuDataList = () => {
    const [ibuData, setIbuData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedIbuId, setSelectedIbuId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedIbuData, setSelectedIbuData] = useState(null);

    useEffect(() => {
        fetchIbuData();
    }, []);

    const fetchIbuData = () => {
        axios.get('/catatan-ibu')
            .then((response) => {
                setIbuData(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleModalOpenClose = (refreshData = false) => {
        setIsModalOpen(!isModalOpen);
        if (refreshData) {
            fetchIbuData();
        }
    };

    const handleAddIbuData = (data) => {
        // Make an API request to add new data for ibu
        axios.post('/catatan-ibu', data)
            .then(() => {
                // Close the modal and refresh the data after successful addition
                handleModalOpenClose(true);
            })
            .catch((error) => {
                console.error('Error adding data:', error);
                // Handle any error here
            });
    };

    const handleEditIbuData = (ibuId) => {
        const selectedIbu = ibuData.find((ibu) => ibu.id === ibuId);
        setSelectedIbuData(selectedIbu);
        setIsEditModalOpen(true);
    };

    const handleEditData = (editedData) => {
        // Make an API request to edit data for ibu
        axios.put(`/catatan-ibu/${selectedIbuData.id}`, editedData)
            .then(() => {
                // Close the modal and refresh the data after successful edit
                setIsEditModalOpen(false);
                fetchIbuData();

                // Show toast notification for successful edit
                toast.success('Data has been edited!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                console.error('Error editing data:', error);
                // Handle any error here
            });
    };

    const handleDeleteIbuData = () => {
        // Make an API request to delete data for ibu based on the selectedIbuId
        axios.delete(`/catatan-ibu/${selectedIbuId}`)
            .then(() => {
                // Refresh the data after successful deletion
                fetchIbuData();
                // Show toast notification for successful deletion
                toast.success('Data has been deleted!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                console.error('Error deleting data:', error);
                // Handle any error here
            })
            .finally(() => {
                // Close the delete dialog regardless of success or failure
                setIsDeleteDialogOpen(false);
            });
    };

    const openDeleteDialog = (id) => {
        setSelectedIbuId(id);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setSelectedIbuId(null);
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className='iburoot'>
            <h1>Data Ibu</h1>
            <Button variant="contained" color="primary" onClick={() => handleModalOpenClose()}>
                Add New Data Ibu
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nama Ibu</TableCell>
                            <TableCell>Usia Ibu (tahun)</TableCell>
                            <TableCell>Usia Kelahiran (minggu)</TableCell>
                            <TableCell>Nama Ayah</TableCell>
                            <TableCell>Alamat Rumah</TableCell>
                            <TableCell>Nomor Telepon Darurat</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ibuData.map((ibu) => (
                            <TableRow key={ibu.id}>
                                <TableCell>{ibu.nama_ibu}</TableCell>
                                <TableCell>{ibu.usia_ibu}</TableCell>
                                <TableCell>{ibu.usia_kehamilan}</TableCell>
                                <TableCell>{ibu.nama_ayah}</TableCell>
                                <TableCell>{ibu.alamat_rumah}</TableCell>
                                <TableCell>{ibu.nomor_telepon_darurat}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => handleEditIbuData(ibu.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => openDeleteDialog(ibu.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* New row for "Pilihan" */}
                        <TableRow>
                            <TableCell colSpan={6}>Pilihan</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <IbuForm open={isModalOpen} onClose={handleModalOpenClose} onAdd={handleAddIbuData} />

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this data?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>No</Button>
                    <Button onClick={handleDeleteIbuData} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Edit Ibu Modal */}
            <EditIbuModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                ibuData={selectedIbuData}
                onEdit={handleEditData}
            />
            <ToastContainer />
        </div>
    );
};

export default IbuDataList;
