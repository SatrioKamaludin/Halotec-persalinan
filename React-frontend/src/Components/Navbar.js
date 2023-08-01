import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="fixed" color="primary">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="inherit">
                    Rumah Sakit Bersalin
                </Typography>
                <div>
                    <Button color="inherit" component={Link} to="/ibu-data-list">
                        Data Ibu
                    </Button>
                    <Button color="inherit" component={Link} to="/bayi-data-list">
                        Data Bayi
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
