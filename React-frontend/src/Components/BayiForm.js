// BayiForm.js
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    InputLabel,
    MenuItem,
} from '@mui/material';

const BayiForm = ({ open, onClose, motherData, onSave }) => {
    const [newBayiData, setNewBayiData] = useState({
        id_ibu: '',
        gender_bayi: '',
        panjang_bayi: '',
        berat_badan_bayi: '',
        tgl_jam_persalinan: '',
        proses_partus: '',
        kondisi_kelahiran: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBayiData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(newBayiData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Data Bayi</DialogTitle>
            <DialogContent>
                <InputLabel htmlFor="Nama Ibu">Nama Ibu</InputLabel>
                <Select
                    label="Nama Ibu"
                    name="id_ibu"
                    value={newBayiData.id_ibu}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {motherData.map((mother) => (
                        <MenuItem key={mother.id} value={mother.id}>
                            {mother.nama_ibu}
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel htmlFor="gender_bayi">Gender Bayi:</InputLabel>
                <Select
                    label="Gender Bayi"
                    name="gender_bayi"
                    value={newBayiData.gender_bayi}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="">-- Pilih Gender Bayi --</MenuItem>
                    <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                    <MenuItem value="Perempuan">Perempuan</MenuItem>
                </Select>
                <TextField
                    label="Panjang Bayi (cm)"
                    name="panjang_bayi"
                    value={newBayiData.panjang_bayi}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Berat Badan Bayi (kg)"
                    name="berat_badan_bayi"
                    value={newBayiData.berat_badan_bayi}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Tanggal dan Jam Persalinan"
                    name="tgl_jam_persalinan"
                    value={newBayiData.tgl_jam_persalinan}
                    onChange={handleChange}
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                />
                <InputLabel htmlFor="Proses Partus">Proses Partus</InputLabel>
                <Select
                    label="Proses Partus"
                    name="proses_partus"
                    value={newBayiData.proses_partus}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Dibantu alat">Dibantu alat</MenuItem>
                    <MenuItem value="Caesar">Caesar</MenuItem>
                    <MenuItem value="Waterbirth">Waterbirth</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel htmlFor="Kondisi Kelahiran">Kondisi Kelahiran</InputLabel>
                <Select
                    label="Kondisi Kelahiran"
                    name="kondisi_kelahiran"
                    value={newBayiData.kondisi_kelahiran}
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
                <Button onClick={handleSave} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BayiForm;
