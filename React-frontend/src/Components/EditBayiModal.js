// EditBayiModal.js
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';

const EditBayiModal = ({ open, onClose, bayiData, onEdit }) => {
    const [editedBayiData, setEditedBayiData] = useState({});

    // Set the initial edited data when the modal is opened
    useEffect(() => {
        if (bayiData) {
            setEditedBayiData(bayiData);
        }
    }, [bayiData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBayiData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditData = () => {
        // Call the onEdit function to pass the edited data to the parent component (APITest)
        onEdit(editedBayiData);

        // Close the modal after editing the data
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Data Bayi</DialogTitle>
            <DialogContent>
                {/* Form for editing bayi data */}
                <TextField
                    label="Gender Bayi"
                    name="gender_bayi"
                    value={editedBayiData.gender_bayi || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Panjang Bayi (cm)"
                    name="panjang_bayi"
                    value={editedBayiData.panjang_bayi || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Berat Badan Bayi (kg)"
                    name="berat_badan_bayi"
                    value={editedBayiData.berat_badan_bayi || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Tanggal dan Jam Persalinan"
                    name="tgl_jam_persalinan"
                    value={editedBayiData.tgl_jam_persalinan || ''}
                    onChange={handleChange}
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                />
                <Select
                    label="Proses Partus"
                    name="proses_partus"
                    value={editedBayiData.proses_partus || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Dibantu alat">Dibantu alat</MenuItem>
                    <MenuItem value="Caesar">Caesar</MenuItem>
                    <MenuItem value="Waterbirth">Waterbirth</MenuItem>
                </Select>
                <br/>
                <br/>
                <Select
                    label="Kondisi Kelahiran"
                    name="kondisi_kelahiran"
                    value={editedBayiData.kondisi_kelahiran || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Cacat">Cacat</MenuItem>
                    <MenuItem value="Meninggal">Meninggal Dunia</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleEditData} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBayiModal;
