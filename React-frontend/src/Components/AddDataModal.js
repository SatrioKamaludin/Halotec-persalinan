import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import axios from '../api';

const AddDataModal = ({ open, onClose }) => {
    const [stage, setStage] = useState('ibu'); // Stage can be 'ibu' or 'bayi'

    // Data for ibu
    const [namaIbu, setNamaIbu] = useState('');
    const [usiaIbu, setUsiaIbu] = useState('');
    const [usiaKehamilan, setUsiaKehamilan] = useState('');
    const [namaAyah, setNamaAyah] = useState('');

    // Data for bayi
    const [ibuId, setIbuId] = useState(null); // To store the id_ibu for adding bayi data later
    const [genderBayi, setGenderBayi] = useState('');
    const [panjangBayi, setPanjangBayi] = useState('');
    const [beratBayi, setBeratBayi] = useState('');
    const [tglJamPersalinan, setTglJamPersalinan] = useState('');
    const [prosesPartus, setProsesPartus] = useState('');
    const [kondisiKelahiran, setKondisiKelahiran] = useState('');

    const handleAddDataIbu = () => {
        // Data for ibu
        const ibuData = {
            nama_ibu: namaIbu,
            usia_ibu: usiaIbu,
            usia_kehamilan: usiaKehamilan,
            nama_ayah: namaAyah,
        };

        // Make API request for adding data for ibu
        axios
            .post('/catatan-ibu', ibuData)
            .then((response) => {
                // After adding data ibu successfully, proceed to the next stage (bayi)
                setStage('bayi');
                // You can also extract id_ibu from the response if your API returns it.
                // For now, let's assume the response data is an object containing the newly added ibu's data.
                const id_ibu = response.data.id;
                setIbuId(id_ibu); // Save the id_ibu in state to use it for adding bayi data later
            })
            .catch((error) => {
                console.error('Error adding data ibu:', error);
                // Handle any error here
            });
    };

    const handleAddDataBayi = () => {
        // Data for bayi
        const bayiData = {
            id_ibu: ibuId, // Use the id_ibu obtained from data ibu
            gender_bayi: genderBayi,
            panjang_bayi: panjangBayi,
            berat_badan_bayi: beratBayi,
            tgl_jam_persalinan: tglJamPersalinan,
            proses_partus: prosesPartus,
            kondisi_kelahiran: kondisiKelahiran,
        };

        // Make API request for adding data for bayi
        axios
            .post('/catatan-bayi', bayiData)
            .then(() => {
                // Reset form data and close the modal
                setNamaIbu('');
                setUsiaIbu('');
                setUsiaKehamilan('');
                setNamaAyah('');
                setGenderBayi('');
                setPanjangBayi('');
                setBeratBayi('');
                setTglJamPersalinan('');
                setProsesPartus('');
                setKondisiKelahiran('');
                setStage('ibu'); // Reset stage to 'ibu' for the next use
                setIbuId(null); // Reset ibuId
                onClose(true); // Signal the parent component to refresh the data after adding new data
            })
            .catch((error) => {
                console.error('Error adding data bayi:', error);
                // Handle any error here
            });
    };

    const handleCloseModal = () => {
        // Reset form data and close the modal
        setNamaIbu('');
        setUsiaIbu('');
        setUsiaKehamilan('');
        setNamaAyah('');
        setGenderBayi('');
        setPanjangBayi('');
        setBeratBayi('');
        setTglJamPersalinan('');
        setProsesPartus('');
        setKondisiKelahiran('');
        setStage('ibu'); // Reset stage to 'ibu' when modal is closed
        setIbuId(null); // Reset ibuId
        onClose(false);
    };

    return (
        <Dialog open={open} onClose={handleCloseModal}>
            <DialogTitle>Add New Data</DialogTitle>
            <DialogContent>
                {stage === 'ibu' ? (
                    <>
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
                    </>
                ) : (
                    <>
                        {/* Form for bayi data */}
                        <InputLabel>Gender Bayi</InputLabel>
                        <Select
                            value={genderBayi}
                            onChange={(e) => setGenderBayi(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="Laki-laki">Laki-Laki</MenuItem>
                            <MenuItem value="Perempuan">Perempuan</MenuItem>
                        </Select>
                        <TextField
                            label="Panjang Bayi (cm)"
                            value={panjangBayi}
                            onChange={(e) => setPanjangBayi(e.target.value)}
                            type="number"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Berat Bayi (kg)"
                            value={beratBayi}
                            onChange={(e) => setBeratBayi(e.target.value)}
                            type="number"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Tanggal dan Jam Persalinan"
                            value={tglJamPersalinan}
                            onChange={(e) => setTglJamPersalinan(e.target.value)}
                            type="datetime-local"
                            fullWidth
                            margin="normal"
                        />
                        <InputLabel>Proses Partus</InputLabel>
                        <Select
                            value={prosesPartus}
                            onChange={(e) => setProsesPartus(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="Dibantu alat">Dibantu alat</MenuItem>
                            <MenuItem value="Caesar">Caesar</MenuItem>
                            <MenuItem value="Waterbirth">Waterbirth</MenuItem>
                        </Select>
                        <InputLabel>Kondisi Kelahiran</InputLabel>
                        <Select
                            value={kondisiKelahiran}
                            onChange={(e) => setKondisiKelahiran(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="Sehat">Sehat</MenuItem>
                            <MenuItem value="Cacat">Cacat</MenuItem>
                            <MenuItem value="Meninggal">Meninggal</MenuItem>
                        </Select>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {stage === 'ibu' ? (
                    <>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button onClick={handleAddDataIbu} color="primary">
                            Next
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setStage('ibu')}>Back</Button>
                        <Button onClick={handleAddDataBayi} color="primary">
                            Add
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AddDataModal;