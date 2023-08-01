// APITest.js
import React, { useEffect, useState } from 'react';
import axios from '../api';
import AddDataModal from './AddDataModal';
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
import BayiForm from './BayiForm';
import EditBayiModal from './EditBayiModal';
import './APITest.css'

const APITest = () => {
    const [babyData, setBabyData] = useState([]);
    const [motherData, setMotherData] = useState([]);
    const [startTime, setStartTime] = useState(''); // Start time for the time range
    const [endTime, setEndTime] = useState(''); // End time for the time range
    const [birthCondition, setBirthCondition] = useState(''); // Selected birth condition
    const [gender, setGender] = useState(''); // Selected gender
    const [minMotherAge, setMinMotherAge] = useState(''); // Minimum mother age
    const [maxMotherAge, setMaxMotherAge] = useState(''); // Maximum mother age
    const [childbirthProcess, setChildbirthProcess] = useState(''); // Selected childbirth process
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal open/close
    const [selectedBayiId, setSelectedBayiId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage the edit modal open/close
    const [selectedBayiData, setSelectedBayiData] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    useEffect(() => {
        // Use Promise.all to fetch baby and mother data simultaneously
        Promise.all([axios.get('/catatan-bayi'), axios.get('/catatan-ibu')])
            .then(([babyResponse, motherResponse]) => {
                setBabyData(babyResponse.data.data); // Save the baby data array in state
                setMotherData(motherResponse.data.data); // Save the mother data array in state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Function to get mother data based on id_ibu
    const getMotherDataById = (id_ibu) => {
        return motherData.find(mother => mother.id === id_ibu);
    };

    // Function to handle opening and closing the modal
    const handleModalOpenClose = (refreshData = false) => {
        setIsModalOpen(!isModalOpen);
        // If refreshData is true, refresh the data after adding new data
        if (refreshData) {
            // Fetch data again after adding new data
            fetchData();
        }
    };

    // Function to fetch data from the API
    const fetchData = () => {
        axios.get('/catatan-bayi')
            .then((response) => {
                setBabyData(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    // Call the fetchData function when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to format date and time to dd-mm-yyyy hh:mm
    const formatDate = (dateTimeString) => {
        const dateObj = new Date(dateTimeString);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    // Function to filter baby data
    const filterBabyData = () => {
        let filteredData = babyData;

        // Filter by time range
        if (startTime && endTime) {
            const startTimeStamp = new Date(startTime).getTime();
            const endTimeStamp = new Date(endTime).getTime();
            filteredData = filteredData.filter(baby => {
                const babyTimeStamp = new Date(baby.tgl_jam_persalinan).getTime();
                return babyTimeStamp >= startTimeStamp && babyTimeStamp <= endTimeStamp;
            });
        }

        // Filter by birth condition
        if (birthCondition) {
            filteredData = filteredData.filter(baby => baby.kondisi_kelahiran === birthCondition);
        }

        // Filter by gender
        if (gender) {
            filteredData = filteredData.filter(baby => baby.gender_bayi === gender);
        }

        // Filter by age range
        if (minMotherAge !== '' && maxMotherAge !== '') {
            filteredData = filteredData.filter(baby => {
                const motherData = getMotherDataById(baby.id_ibu);
                if (motherData) {
                    const motherAge = motherData.usia_ibu;
                    return motherAge >= parseInt(minMotherAge) && motherAge <= parseInt(maxMotherAge);
                }
                return false;
            });
        }

        // Filter by childbirth process
        if (childbirthProcess) {
            filteredData = filteredData.filter(baby => baby.proses_partus === childbirthProcess);
        }

        return filteredData;
    };

    // Function to calculate the total count of baby data after applying filters
    const getTotalFilteredCount = () => {
        const filteredData = filterBabyData();
        return filteredData.length;
    };

    // Handle changes in the input fields
    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    const handleBirthConditionChange = (event) => {
        setBirthCondition(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleMinMotherAgeChange = (event) => {
        setMinMotherAge(event.target.value);
    };

    const handleMaxMotherAgeChange = (event) => {
        setMaxMotherAge(event.target.value);
    };

    const handleChildbirthProcessChange = (event) => {
        setChildbirthProcess(event.target.value);
    };

    const handleSaveBayiData = (newBayiData) => {
        // Make an API request to save the new bayi data
        axios.post('/catatan-bayi', newBayiData)
            .then((response) => {
                // Refresh the data after successful addition
                fetchData();
                // Show toast notification for successful addition
                toast.success('Data bayi telah ditambahkan!', {
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
                console.error('Error adding data:', error);
                // Handle any error here
            })
            .finally(() => {
                // Close the add modal regardless of success or failure
                setIsAddModalOpen(false);
            });
    };

    const filteredBabyData = filterBabyData();

    const totalFilteredCount = getTotalFilteredCount();

    const handleAddModalOpenClose = () => {
        setIsAddModalOpen(!isAddModalOpen);
    };

    // Function to handle opening and closing the edit modal
    const handleEditModalOpenClose = (bayiData = null) => {
        setSelectedBayiData(bayiData);
        setIsEditModalOpen(!isEditModalOpen);
    };

    // Function to handle editing baby data
    const handleEditBayiData = (editedData) => {
        // Make an API request to update data for bayi based on the selected bayi id
        axios.put(`/catatan-bayi/${selectedBayiData.id}`, editedData)
            .then(() => {
                // Refresh the data after successful editing
                fetchData();
                // Show toast notification for successful editing
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
            })
            .finally(() => {
                // Close the edit modal regardless of success or failure
                setIsEditModalOpen(false);
            });
    };

    const handleDeleteBayiData = () => {
        // Make an API request to delete data for bayi based on the selectedBayiId
        axios.delete(`/catatan-bayi/${selectedBayiId}`)
            .then(() => {
                // Refresh the data after successful deletion
                fetchData();
                // Show toast notification for successful deletion
                toast.success('Data Bayi telah dihapus!', {
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
        setSelectedBayiId(id);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setSelectedBayiId(null);
        setIsDeleteDialogOpen(false);
    };

    // Calculate the number of babies born within the specified time range
    return (
        <div className='babyroot'>
            <h1>Data Bayi</h1>
            <div className="form-item">
                <div className="form-row">
                    <label>Start Time:      </label>
                    <input type="datetime-local" value={startTime} onChange={handleStartTimeChange} />
                </div>
                <div className="form-row">
                    <label>End Time:        </label>
                    <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} />
                </div>
            </div>
            <div className="form-item">
                <label>Kondisi kelahiran:</label>
                <select value={birthCondition} onChange={handleBirthConditionChange}>
                    <option value="">-- Pilih pondisi kelahiran --</option>
                    <option value="Sehat">Sehat</option>
                    <option value="Cacat">Cacat</option>
                    <option value="Meninggal">Meninggal Dunia</option>
                </select>
            </div>
            <div className="form-item">
                <label>Kelamin bayi:</label>
                <select value={gender} onChange={handleGenderChange}>
                    <option value="">-- Pilih kelamin bayi --</option>
                    <option value="Laki-laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            <div className="form-item">
                <div className="form-row">
                    <label>Usia Ibu minimal:</label>
                    <input type="number" value={minMotherAge} onChange={handleMinMotherAgeChange} style={{ width: '2rem' }}/>
                </div>
                <div className="form-row">
                    <label>Usia Ibu maksimal:</label>
                    <input type="number" value={maxMotherAge} onChange={handleMaxMotherAgeChange} style={{ width: '2rem' }}/>
                </div>
            </div>
            <div className="form-item">
                <label>Proses partus:</label>
                <select value={childbirthProcess} onChange={handleChildbirthProcessChange}>
                    <option value="">-- Select Childbirth Process --</option>
                    <option value="Normal">Normal</option>
                    <option value="Caesar">Caesar</option>
                    <option value="Waterbirth">Waterbirth</option>
                    <option value="Dibantu alat">Dibantu Alat</option>
                </select>
            </div>
            <Button variant="contained" color="primary" onClick={handleAddModalOpenClose}>
                ⊕ Add Data Bayi
            </Button>
            <p>{totalFilteredCount} Hasil pencarian</p>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nama Ibu</TableCell>
                            <TableCell>Usia Ibu (tahun)</TableCell>
                            <TableCell>Usia Kelahiran (minggu)</TableCell>
                            <TableCell>Nama Ayah</TableCell>
                            <TableCell>Kelamin bayi</TableCell>
                            <TableCell>Panjang bayi (cm)</TableCell>
                            <TableCell>Berat bayi (kg)</TableCell>
                            <TableCell>Tanggal dan jam persalinan</TableCell>
                            <TableCell>Proses partus</TableCell>
                            <TableCell>Kondisi kelahiran</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBabyData.map(baby => (
                            <TableRow key={baby.id}>
                                <TableCell>{getMotherDataById(baby.id_ibu)?.nama_ibu}</TableCell>
                                <TableCell>{getMotherDataById(baby.id_ibu)?.usia_ibu}</TableCell>
                                <TableCell>{getMotherDataById(baby.id_ibu)?.usia_kehamilan}</TableCell>
                                <TableCell>{getMotherDataById(baby.id_ibu)?.nama_ayah}</TableCell>
                                <TableCell>{baby.gender_bayi}</TableCell>
                                <TableCell>{baby.panjang_bayi}</TableCell>
                                <TableCell>{baby.berat_badan_bayi}</TableCell>
                                <TableCell>{formatDate(baby.tgl_jam_persalinan)}</TableCell>
                                <TableCell>{baby.proses_partus}</TableCell>
                                <TableCell>{baby.kondisi_kelahiran}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => handleEditModalOpenClose(baby)} // Pass the baby data to the edit modal
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => openDeleteDialog(baby.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Render the BayiForm component inside the modal */}
            <BayiForm
                open={isAddModalOpen}
                onClose={handleAddModalOpenClose}
                motherData={motherData}
                onSave={handleSaveBayiData}
            />
            {/* Add EditBayiModal to edit baby data */}
            <EditBayiModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                bayiData={selectedBayiData}
                onEdit={handleEditBayiData}
            />
            {/* Dialog for confirming delete */}
            <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the bayi data?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDeleteBayiData} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Add ToastContainer to display toast notifications */}
            <ToastContainer />
        </div>
    );
};

export default APITest;
