import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IbuForm = ({ open, onClose, onAdd }) => {
    const [namaIbu, setNamaIbu] = useState('');
    const [usiaIbu, setUsiaIbu] = useState('');
    const [usiaKehamilan, setUsiaKehamilan] = useState('');
    const [namaAyah, setNamaAyah] = useState('');
    const [alamatRumah, setAlamatRumah] = useState('');
    const [nomorTeleponDarurat, setNomorTeleponDarurat] = useState('');

    const handleAddDataIbu = () => {
        // Data for ibu
        const ibuData = {
            nama_ibu: namaIbu,
            usia_ibu: usiaIbu,
            usia_kehamilan: usiaKehamilan,
            nama_ayah: namaAyah,
            alamat_rumah: alamatRumah,
            nomor_telepon_darurat: nomorTeleponDarurat,
        };

        // Call the onAdd function to pass the data to the parent component (APITest)
        onAdd(ibuData);

        // Show a toast notification when the new data is added
        toast.success('New data for ibu has been added!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Data Ibu</DialogTitle>
            <DialogContent>
                {/* Form for ibu data */}
                <TextField
                    label="Nama Ibu"
                    value={namaIbu}
                    onChange={(e) => setNamaIbu(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Usia Ibu (tahun)"
                    value={usiaIbu}
                    onChange={(e) => setUsiaIbu(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Usia Kehamilan (minggu)"
                    value={usiaKehamilan}
                    onChange={(e) => setUsiaKehamilan(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Nama Ayah"
                    value={namaAyah}
                    onChange={(e) => setNamaAyah(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Alamat Rumah"
                    value={alamatRumah}
                    onChange={(e) => setAlamatRumah(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Nomor Telepon Darurat"
                    value={nomorTeleponDarurat}
                    onChange={(e) => setNomorTeleponDarurat(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddDataIbu} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        <ToastContainer />
        </>
    );
};

export default IbuForm;
