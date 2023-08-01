import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';
import { toast } from 'react-toastify';

const EditIbuModal = ({ open, onClose, ibuData, onEdit }) => {
    const [editedIbuData, setEditedIbuData] = useState({});

    useEffect(() => {
        // Set the initial edited data only if ibuData is defined
        if (ibuData) {
            setEditedIbuData(ibuData);
        }
    }, [ibuData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedIbuData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditData = () => {
        // Call the onEdit function to pass the edited data to the parent component (IbuDataList)
        onEdit(editedIbuData);

        // Close the modal after editing the data
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Data Ibu</DialogTitle>
            <DialogContent>
                {/* Form for editing ibu data */}
                <TextField
                    label="Nama Ibu"
                    name="nama_ibu"
                    value={editedIbuData.nama_ibu || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Usia Ibu (tahun)"
                    name="usia_ibu"
                    value={editedIbuData.usia_ibu || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Usia Kehamilan (minggu)"
                    name="usia_kehamilan"
                    value={editedIbuData.usia_kehamilan || ''}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Nama Ayah"
                    name="nama_ayah"
                    value={editedIbuData.nama_ayah || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Alamat Rumah"
                    name="alamat_rumah"
                    value={editedIbuData.alamat_rumah || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Nomor Telepon Darurat"
                    name="nomor_telepon_darurat"
                    value={editedIbuData.nomor_telepon_darurat || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
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

export default EditIbuModal;
